import { Component, OnInit } from '@angular/core';


export interface ImagesBanner {
  previewImageSrc?: string;
  thumbnailImageSrc?: string;
  alt?: string;
  title?: string;
}

const ELEMENT_DATA: ImagesBanner[] = [
  { previewImageSrc: 'assets/banner1.jpg', thumbnailImageSrc: 'assets/banner1.jpg', alt: 'Banner 1', title: 'Banner 1' },
  { previewImageSrc: 'assets/banner2.png', thumbnailImageSrc: 'assets/banner2.png', alt: 'Banner 1', title: 'Banner 1' },
  { previewImageSrc: 'assets/banner3.jpg', thumbnailImageSrc: 'assets/banner3.jpg', alt: 'Banner 1', title: 'Banner 1' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  images: ImagesBanner[] = ELEMENT_DATA;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
