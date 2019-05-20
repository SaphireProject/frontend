import {Component, OnInit} from '@angular/core';
import {IImage} from '../_models/IImage';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
    images = 'https://cdn.vox-cdn.com/uploads/chorus_image/image/56748793/dbohn_170625_1801_0018.0.0.jpg'
      // { url: '/assets/images/walp1.jpeg', backgroundSize: 'contain', backgroundPosition: 'center' },
      // { url: '/assets/images/walp1.jpeg', backgroundSize: 'contain', backgroundPosition: 'center' }
    ;


  imageUrls: (string | IImage)[] = [
    { url: 'assets/images/screenshoot_1.png', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: 'assets/images/screenshoot_2.png', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: 'assets/images/screenshoot_3.png', backgroundSize: 'contain', backgroundPosition: 'center' },
    { url: 'assets/images/screenshoot_4.png', backgroundSize: 'contain', backgroundPosition: 'center' }
  ];

  imageObject: Array<object> = [{
    image: 'assets/images/screenshoot_1.png',
    thumbImage: 'assets/images/screenshoot_1.png'
  }, {
    image: 'assets/images/screenshoot_2.png',
    thumbImage: 'assets/images/screenshoot_2.png',
  },
    {
      image: 'assets/images/screenshoot_3.png',
      thumbImage: 'assets/images/screenshoot_3.png',
    },
    {
      image: 'assets/images/screenshoot_4.png',
      thumbImage: 'assets/images/screenshoot_4.png'
    },
  ];
  constructor() {
  }

  ngOnInit() {
  }



}

const IMAGES = [
  {url: '/assets/images/walp2.jpeg'},
  {url: '/assets/images/walp2.jpeg'},
];


const imageObject: Array<object> = [{
  video: 'https://youtu.be/6pxRHBw-k8M'
}
];
