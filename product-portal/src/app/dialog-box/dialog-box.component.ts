import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AddComponent } from '../add';



interface Price {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  ProductForm !: FormGroup;
  actionBtn: String = "Save"

  productId: any;
  productName: any;
  productDesc: any;
  productPrice: any;
  productQuantity: any;
  productType: any;
  prod: any;
  date: any;


  radio = ["Laptop", "Mobile", "Tablet"]


  //quantity
  quantity: number = 1;

  plus() {
    this.quantity = this.quantity + 1;
  }
  minus() {
    if (this.quantity != 0) {
      this.quantity = this.quantity - 1;
    }

  }


  //Multiple select
  prodList: string[] = ['New mobile', 'New product', 'Amazing features', 'New version', 'New Themes', 'Color'];

  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {
    this.quantity = parseInt(this.editData.productQuantity);
   }

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      productId: [''],
      productName: [''],
      productPrice: [''],
      prod: [''],
      productDesc: [''],
      date: [''],
      productType: [''],
      productQuantity: [''],

    });
    console.log(this.editData);

    if (this.editData) {
      this.actionBtn = "Update";
      this.ProductForm.controls['productId'].setValue(this.editData.productId);
      this.ProductForm.controls['productName'].setValue(this.editData.productName);
      this.ProductForm.controls['productPrice'].setValue(this.editData.productPrice);
      this.ProductForm.controls['productDesc'].setValue(this.editData.productDesc);
      this.ProductForm.controls['productType'].setValue(this.editData.productType);
      this.ProductForm.controls['productQuantity'].setValue(this.editData.productQuantity);

    }

  }

  //createNewProduct
  createProduct() {
    if (!this.editData) {
      let newProduct = [{
        productId: this.productId,
        productName: this.productName,
        productDesc: this.productDesc,
        productPrice: this.productPrice,
        productQuantity: this.productQuantity,
        productType: this.productType,
      }]
      this.productService.save(newProduct).subscribe(data => {
        console.log("success");
        alert("successfully added");
        this.ProductForm.reset();
        this.dialogRef.close();
        this.router.navigate(['/product']);
      });
    }
    else {
      this.updateProduct()
    }

  }
  updateProduct() {
    this.ProductForm.controls['productQuantity'].setValue(this.quantity);
    this.productService.updateProduct(this.ProductForm.value, this.editData.productId).subscribe(data => {

      this.ProductForm.reset();
      this.dialogRef.close('update');

    })

  }

}