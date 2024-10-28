import { Component } from '@angular/core';
import { ElectronService } from '../../../../core/services/electron.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  question : string = ""
  current : string = "Write the question"
  constructor(private electron : ElectronService){
    this.electron.on("question:update",(ev,question)=>{
      this.current = question
    })

    this.electron.invoke("question:current").then((q : string)=>{
      this.current = q
    })
  }

  update(){
    this.electron.send("question:update",this.question)
  }
}
