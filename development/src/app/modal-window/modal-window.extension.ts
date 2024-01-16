import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// WE NEED ANGULAR FORMS TO USE THE ngIf DIRECTIVE
import { FormsModule } from '@angular/forms';

// IMPORT NG-ICON MODULE AND SOME ICONS
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { faSolidCircleInfo,faSolidCircleXmark,faSolidCircleExclamation,faSolidTriangleExclamation,faSolidCircleQuestion } from '@ng-icons/font-awesome/solid';

@Component({
  selector: 'modal-window',
  standalone: true,
  imports: [CommonModule,FormsModule,NgIconComponent],
  providers: [provideIcons({ faSolidCircleInfo,faSolidCircleXmark,faSolidCircleExclamation,faSolidTriangleExclamation,faSolidCircleQuestion })],
    templateUrl: './modal-window.extension.html',
  styles: [
  `
.GlassMorphBox {
display: grid;              // USE A GRID-LAYOUT FOR THE MAIN-DIV
align-content: start;       // ALIGN THE CONTENT VERTICAL AT THE TOP
justify-content: center;    // ALIGN THE CONTENT HORIZONTALLY IN THE CENTER
position: absolute;         // WE NEED AN ABSOLUTE POSITION, TO MAKE USE OF TOP,LEFT,RIGHT,BOTTOM
top: 0px;
left: 0;
right: 0;
bottom: 0px;
overflow: hidden;
margin: 0px 0px 0px 0px;    // TOP LEFT BOTTOM RIGHT
padding: 0px 0px 0px 0px;
z-index: 5000;
/* From https://css.glass */
background: rgba(255, 255, 255, 0.3);
border-radius: 8px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(3px);
-webkit-backdrop-filter: blur(3px);
border: 1px solid rgba(255, 255, 255, 0.3);
}
.DialogBox {
position: absolute;
border: 1px solid rgba(60, 60, 60, 0.9);
border-radius: 8px;
background-color: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
z-index: 5001;
padding: 10px 10px 10px 10px;
}
.DialogButton {
width: 120px;
height: 28px;
background-color: #ADADAD;
border: 1px solid rgba(60, 60, 60, 0.9);
border-radius: 8px;
font-family: 'Comfortaa', sans-serif;
font-size: 12px;
font-weight: 900;
color: #333333;
transition: background-color 0.2s ease;
}
.DialogButton:hover {
cursor: pointer;
background-color: #BEBEBE;
}
.FontModalWinHead {
font-family: 'Comfortaa', sans-serif;
font-size: 16px;
font-weight: bold;
color: #333333;
}
.FontModalWinBody {
font-family: 'Comfortaa', sans-serif;
font-size: 16px;
font-weight: normal;
color: #333333;
}
  `
  ]
})

export class ModalWindowExtension implements OnInit {
  
  // SET THE SIZE OF THE MODAL WINDOW DURING INIT
  ngOnInit() {
    /* DEMO CODE
    this.ModalWinConfig("SizeX",400);
    this.ModalWinConfig("SizeY",160);
    this.SetModalWindowIcon("stop");
    this.SetModalWinHeadText("This action is not allowed!")
    this.SetModalWinBodyText("You cannot delete the main workspace.<br>(press the button to return)<br><br>")
    */
    this.ModalWin.Vmode = false;
  }

  // THE OBJECT OF OUR MODAL WINDOW -> THIS STORES THE CONFIFURATION OF OUR MODAL DIALOG BOX
  // RECOMMENDATION: USE A MINIMUM SIZE OF 400x160. THIS IS ENOUGH SPACE FOR TWO TO THREE LINES OF TEST AND THE WINDOW STILL LOOKS GOOD
  public ModalWin = {
  SizeX: '400px',       // THE WIDTH
  SizeY: '120px',       // THE HEIGHT -> 120px SHOULD BE THE MINIMUM!
  Vmode: true,          // VISIBLE? (true=yes / false=no)
  Image: 'info',
  }
  // THESE TWO VARS STORE THE TITLE AND THE BODY-TEXT
  public ModalWinHeadText: string = "";
  public ModalWinBodyText: string = "";

  // SIMPLE FUNCTION THAT SETS THE TOP- AND LEFT- POSITION OF THE MODAL DIALOG BOX -> THIS ONE IS CALLED INSIDE ngOnInit
  public ModalWinConfig( Option: string, Value: any) {
    if( Option.toLowerCase() == "sizex" ) { this.ModalWin.SizeX = String(Value)+"px"; }
    if( Option.toLowerCase() == "sizey" ) { this.ModalWin.SizeY = String(Value)+"px"; }
  }

  // TWO SIMPLE FUNCTIONS TO SHOW/HIDE THE MODAL WINDOW
  public HideModalWin() { this.ModalWin.Vmode = false; }
  public ShowModalWin() { this.ModalWin.Vmode = true; }
  
  // SET THE ICON OF OUR MODAL WINDOW
  public SetModalWindowIcon( IconID: string) {
    IconID = IconID.toLowerCase();
    if( IconID == 'info' ) { this.ModalWin.Image = 'info'; }
    if( IconID == 'warn' ) { this.ModalWin.Image = 'warn'; }
    if( IconID == 'stop' ) { this.ModalWin.Image = 'stop'; }
    if( IconID == 'quest' ) { this.ModalWin.Image = 'quest'; }
  }

  // SET THE TITLE -> IF THERE IS NO PARAM GIVEN, THE FUNCTION TRIES TO SET THE TITLE RELATED TO THE ICON
  public SetModalWinHeadText(HeadText: string) {
    if( HeadText.length != 0 ) { this.ModalWinHeadText = String(HeadText) }
    else {
      if( this.ModalWin.Image.toLowerCase() == 'info' ) { this.ModalWinHeadText = "Information"; }
      else if( this.ModalWin.Image.toLowerCase() == 'stop' ) { this.ModalWinHeadText = "Attention"; }
      else if( this.ModalWin.Image.toLowerCase() == 'warn' ) { this.ModalWinHeadText = "Warning"; }
      else if( this.ModalWin.Image.toLowerCase() == 'quest' ) { this.ModalWinHeadText = "Question"; }
      else { this.ModalWinHeadText = "Modal Window"; }
    }
  }

  // THIS FUNCTION SETS THE BODY-TEXT
  public SetModalWinBodyText(BodyText: string) {
    if( BodyText.length != 0 ) { this.ModalWinBodyText = String(BodyText) }
  }
}
