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
  // product: Product = null!;
  productCategories: ProductCategory[] = [];
  currentProduct: Product | null = null;
  updateMode = false;
  ngOnInit() {
    this.getCategories();
    this.currentProduct = this.productService.getUpdatedProduct();
    if(this.currentProduct) { // update
      this.updateMode = true;
      this.productForm.patchValue(this.currentProduct);
      this.productForm.patchValue({nameEn: this.currentProduct.name['en']});
      this.productForm.patchValue({nameAr: this.currentProduct.name['ar']});
      this.productForm.patchValue({descriptionEn: this.currentProduct.description['en']});
      this.productForm.patchValue({descriptionAr: this.currentProduct.description['ar']});
      this.productService.getProductCategory(this.currentProduct.id).subscribe(
        (category: ProductCategory) => {
          this.productForm.patchValue({category: category.id});
        }
      )
    }
    else{
      this.resetForm();
    }
    this.productService.setUpdatedProduct(null);
    // this.translate.languageSubject.subscribe((language: Language) => {
    //   this.getCategories();
    // })
    // if (this.product) {
    //   this.fillFormWithProductData();
    // }
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
      category: [1, Validators.required],
      imageUrl: ['/assets/images/default.png']
    });
 
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.formatFormData(this.productForm.value);
      console.log(productData);
      if(productData.id) { // update
        delete productData.category;
        this.productService.updateProduct(productData).subscribe((data: Product) => {
            console.log(data);
            this.resetForm();
            this.toastr.success('Product updated successfully', 'Success');
            this.updateMode = false;
        })
      }
      else{
        this.productService.addProduct(productData).subscribe((data: Product) => {
          console.log(data);
          this.resetForm();
          this.toastr.success('Product added successfully', 'Success');
        })
      }
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
      quantity: 1, category: 1, 
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

}
