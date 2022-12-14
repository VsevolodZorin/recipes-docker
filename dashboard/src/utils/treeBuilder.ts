import { ICategory } from 'src/types/category/category.interface';

export interface ICell {
	_currentCategory: ICategory | null;
	_prev: ICell | null;
	_next: ICell[];
	_isOpen: boolean;
	initParent?: (list: ICell[]) => void;
	initBreadcrumbs?: () => ICell[];
}

class Cell implements ICell {
	public _currentCategory: ICategory | null = null;
	public _prev: ICell | null = null;
	public _next: ICell[] = [];
	public _isOpen: boolean = false;

	constructor(initialState: ICell | null = null) {
		if (initialState) {
			this._currentCategory = initialState._currentCategory;
			this._prev = initialState._prev;
			this._next = initialState._next;
		}
	}

	initParent(list: ICell[]): void {
		const parent: ICell | undefined = list.find(
			el => el._currentCategory?._id === this._currentCategory?.parentId
		);
		if (parent) {
			this._prev = parent;
		}
	}

	initBreadcrumbs(): ICell[] {
		let parent: ICell | null = this._prev;
		const breadcrumbs: ICell[] = [];
		do {
			if (parent) {
				breadcrumbs.unshift(parent);
				parent = parent._prev;
			}
		} while (parent);
		return breadcrumbs;
	}
}

export class TreeManager {
	cellsList: ICell[] = [];
	rootCellsList: ICell[] = [];

	constructor(readonly sourceCategoryList: ICategory[]) {
		this.cellsList = this.sourceCategoryList.map(el => this.wrapCategoryToCell(el));
	}

	getByParrentId(parrentId: string | null): ICategory[] {
		return this.sourceCategoryList.filter(el => el.parentId === parrentId);
	}

	findManyByParentId(id: string | null): ICell[] {
		return this.cellsList.filter(cell => cell._currentCategory?.parentId === id);
	}

	wrapCategoryToCell(category: ICategory) {
		const cell = new Cell();
		cell._currentCategory = category;
		return cell;
	}

	/**
	 * @description: 'cell(category) -> init cell.prev: ICell and cell.next: ICell[]'
	 */
	rec = (cellsList: ICell[]) => {
		cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);
			if (el._next.length > 0) {
				this.rec(el._next);
			}
		});
	};

	init() {
		this.rootCellsList = this.findManyByParentId(null);

		this.cellsList.forEach((el, index, arr) => {
			el._next = this.findManyByParentId(el._currentCategory!._id);
			el.initParent!(this.cellsList);

			this.rec(this.cellsList);
		});
	}
}

export const treeBuilder = (categories: ICategory[]) => {};
