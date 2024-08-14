import { Injectable, signal } from '@angular/core';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

interface State {
  data: Category[],
  loading: boolean,
  error: string | null
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  state = signal<State>({
    data: [],
    loading: false,
    error: null
  });


  addItem(): void {
    const categories = this.state().data;

    if (categories.length > 0) {
      this.addProductToLastCategory(categories);
    }else {
      this.addNewCategory();
    }
  }
  addCategory(): void {
    const categories = this.state().data;

    const category: any = {
      name: "New Category",
      image: "https://picsum.photos/200",
      products: [{
        item: "New Item",
        price: 2,
        image: "https://picsum.photos/200",
        category: "New products"
      }]
    };
    let tem=[category]
    this.state.update(state => { 
      console.log("statestate",state);
      
      return { ...state, data:tem }
     });
    // categories.push(category)
    
  // this.state.set({data:<any>categories.push(category),loading: false, error: null})
    // this.state.update(state => { return { ...state, data: [category] } });
  }


  removeItem(name: string): void {
    const categories = this.state().data.filter(category => category.name !== name);
    // const categories = this.state().data
    // categories.splice(categories.findIndex(x=>x.name==name),1)
    // console.log("categoriescategories",categories);
      this.state.update(state => { 
        console.log("statestate",state);
        
        return { ...state, data: [] }
       });
    // this.state.set({ data: categories, loading: false, error: null });
  }

  private addProductToLastCategory(categories: Category[]): void {
    const lastItem = categories[categories.length - 1];
    lastItem.products.push({
      item: "New Item",
      price: 2,
      image: "https://picsum.photos/200",
      category: lastItem.name
    });
    this.state.update(state => { return { ...state, data: categories } });
  }

  private addNewCategory(): void {
    const category: Category = {
      name: "New Category",
      image: "https://picsum.photos/200",
      products: [{
        item: "New Item",
        price: 2,
        image: "https://picsum.photos/200",
        category: "New Category"
      }]
    };

    this.state.update(state => { return { ...state, data: [category] } });
  }

  private async fetchProducts(): Promise<Product[]> {
    const path = "/assets/data/products.json";
    return await fetch(path).then(res => res.json());
  }

  private async fetchCategories(): Promise<Category[]> {
    const path = "/assets/data/categories.json";
    return await fetch(path).then(res => res.json()).then(categories => categories.map((category: Category) => {
      category.products = [];
      return category;
    }));
  }

  async loadData(): Promise<void> {
    this.state.set({ data: [], loading: true, error: null });

    try {
      const [categories, products] = await Promise.all([this.fetchCategories(), this.fetchProducts()]);

      products.forEach(product => {
        let data = categories.find(category => category.name === product.category);
        if (data) {
          data.products.push(product);
        } else {
          console.warn(`Category ${product.category} not found!`);
        }
      });

      this.state.set({ data: categories, loading: false, error: null });
    }catch (error: any) {
      this.state.set({ data: [], loading: false, error: error.message });
    }
  }
}
