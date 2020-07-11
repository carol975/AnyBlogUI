import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import MediumEditor from 'medium-editor';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit, AfterViewInit {

  @ViewChild('editable') editable: ElementRef;

  editor;
  constructor() { }
  ngAfterViewInit(): void {
    const edit = this.editable.nativeElement;
     this.editor = new MediumEditor(edit, {
       toolbar: {
         buttons: ['bold', 'italic', 'quote', 'anchor', 'image','removeFormat']
       },
       autoLink:true,
       extensionse: {
         imageDragging: false
       }
     } );  
  }


  save_post(){
    console.log(this.editor.getContent())
  }
  
  ngOnInit(): void {
  }

}
