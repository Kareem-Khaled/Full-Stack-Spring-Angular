import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductCategory } from '../../shared/product-category';
import { Product } from '../../shared/product';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { MyTranslateService } from '../../services/translate/my-translate.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productCategories: ProductCategory[] = [];
  updateMode = false;
  ngOnInit() {
    this.getCategories();
    this.productService.currentProduct.subscribe((product: Product | null) => {
      this.handleCurrentProduct(product);
    })
  }

  constructor(private fb: FormBuilder, 
              private productService: ProductService, 
              private toastr: ToastrService,
              public translate: MyTranslateService) {

    this.productForm = this.fb.group({
      id: [0],
      nameEn:['', Validators.required],
      nameAr:['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      descriptionEn: ['', [Validators.required, Validators.minLength(10)]],
      descriptionAr: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: [1, Validators.required],
      imageUrl: ['/assets/images/default.png']
    });
 
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.formatFormData(this.productForm.value);
      this.productService.addProduct(productData).subscribe((data: Product) => {
        this.resetForm();
        const state = this.updateMode ? 'Updated' : 'added';
        this.updateMode = false;
        this.toastr.success(`Product ${state} successfully`, 'Success');
      })
    }
  }

  getCategories(){
    this.productService.getproductCategories().subscribe((data: ProductCategory[]) => {
      console.log(data);
      this.productCategories = data;
    });
  }

  formatFormData(productData: any) {
    const reformattedProductData = {
      ...productData,
      name: {
        en: productData.nameEn,
        ar: productData.nameAr
      },
      description: {
        en: productData.descriptionEn,
        ar: productData.descriptionAr
      }
    }
    delete reformattedProductData.nameEn;
    delete reformattedProductData.nameAr;
    delete reformattedProductData.descriptionEn;
    delete reformattedProductData.descriptionAr;
    return reformattedProductData;
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.patchValue({
      id: 0, price:1,
      quantity: 1, categoryId: 1, 
      imageUrl: '/assets/images/default.png'
    });
  }
  // fillFormWithProductData() {
  //   this.productForm.setValue({
  //     nameEn: this.product.name['en'],
  //     nameAr: this.product.name['ar'],
  //     price: this.product.price,
  //     quantity: this.product.quantity,
  //     descriptionEn: this.product.description['en'],
  //     descriptionAr: this.product.description['ar'],
  //     category: 1,
  //     imageUrl: this.product.imageUrl
  //   });
  // }

   handleCurrentProduct(product: Product | null) {
    if(product) { // update
      this.updateMode = true;
      this.productForm.patchValue(product);
      this.productForm.patchValue({nameEn: product.name['en']});
      this.productForm.patchValue({nameAr: product.name['ar']});
      this.productForm.patchValue({descriptionEn: product.description['en']});
      this.productForm.patchValue({descriptionAr: product.description['ar']});
      this.productForm.patchValue({categoryId: product.categoryId});
    }
    else{
      this.updateMode = false;
      this.resetForm();
    }
   }
}
