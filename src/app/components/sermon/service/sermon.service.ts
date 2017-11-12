import { Injectable } from '@angular/core';

import {SermonPost} from '../model/SermonPost';
import {SermonPosts} from '../model/Mock-SermonPosts';

@Injectable()
export class SermonService {

  constructor() { }

  getSermonPosts():Promise<SermonPost[]> {
    return Promise.resolve(SermonPosts);
  }

  // getSermonPost(id:number):Promise<SermonPost> {
  //   for(let i = 0; i < SermonPosts.length; i++) {
  //     if(id === SermonPosts[i].id) {
  //         return Promise.resolve(SermonPosts[i]);
  //     }
  //   }
  // }

  getSermonPost(id: number): Promise<SermonPost> {
  return this.getSermonPosts()
             .then(sermonPosts => sermonPosts.find(sermonPost => sermonPost.id === id));
  }
}
