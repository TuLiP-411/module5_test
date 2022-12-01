import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }
  get productForm(): FormGroup {
    return this._productForm;
  }

  set productForm(value: FormGroup) {
    this._productForm = value;
  }

  // @ts-ignore
  private _productForm: FormGroup;
  // @ts-ignore
  private _id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this._id = +paramMap.get('id');
      this.getProduct(this._id);
    });
  }

  ngOnInit() {
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this._productForm = new FormGroup({
        id: new FormControl(product.id),
        title: new FormControl(product.title),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
      });
    });
  }

}
