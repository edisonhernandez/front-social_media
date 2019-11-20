import { Component, OnInit,DoCheck} from '@angular/core';
import {TweetService } from '../../services/tweet.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { TouchSequence } from 'selenium-webdriver';
declare var $:any;
declare var CanvasJS:any;
@Component({
  selector: 'app-hometweets',
  templateUrl: './hometweets.component.html',
  styleUrls: ['./hometweets.component.css'],
  providers: [TweetService]
})
export class HometweetsComponent implements OnInit,DoCheck{

  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public itemsPerPage;
  public tweets = []
  public tweets2 = []
  public busqueda;
  public bsq;
  public status;
  public tipo;
  // tslint:disable-next-line: variable-name
  constructor(private tweetSe: TweetService, private _route: ActivatedRoute,
              // tslint:disable-next-line: variable-name
              private _router: Router) {
                this.bsq = this.tweetSe.obtBSQ();
                this.page = 1;
                this.busqueda = false;
                
               }

  ngOnInit() {

    $(document).ready(() =>{
    this.graficoTWT()
    });
    this.actualPage2();
   
 
  }

  ngDoCheck(){
    this.bsq = this.tweetSe.obtBSQ();

  }
  actualPage2() {
 
    this._route.params.subscribe(params => {

      let tipo = params['tipo'];
      this.tipo = tipo;
      let page = +params['page'];

      this.page = page;
      if (!params['page']) {
        page = 1;
        this.page = 1;
      }
      if (!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if (this.prev_page <= 0) {
          this.prev_page = 1;
        }
      }

      if(tipo == "busqueda"){
        this.obtFiltroTweets(this.bsq)
      }else{
        this.obtTweets(page);
        $(document).ready(() => {
        this.graficoTWT()
        });
      }
        


    });

  }
 
  graficoTWT(){
    this.tweetSe.obtALLtweets2HLG().subscribe(
      response=>{
        var datos = [];
        var contP = 0, contN = 0, contNeg = 0, contTotal = 0;

        for (var i in response) {
          contTotal++;
          if (response[i].sentiment == "negative") {
            contNeg++;
          } else if (response[i].sentiment == "positive") {
            contP++;
          } else if (response[i].sentiment == "neutral") {
            contN++;
          }
        }


          CanvasJS.addColorSet("prueba", ["#5fe394", "#ee465c", "#eee846"])
          var chart = new CanvasJS.Chart("chartContainer", {
            colorSet: "prueba",
            title: {
              text: "TOTAL DE TWEETS\t" + contTotal
            },
            data: [
              {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "doughnut",
                dataPoints: [
                  { label: "POSITIVO", y: contP },
                  { label: "NEGATIVO", y: contNeg },
                  { label: "NEUTRAL", y: contN }
                ]
              }
            ]
          });
          chart.render();





      }   
    )
}

  obtTweets(page, adding = false) {
    this.status = "process"
    this.tweetSe.obttweets(page).subscribe(
      response => {
       
        if (response.tweets && response.n == '1') {
          this.status = "success"
          this.total = response.total;
          this.pages = response.pages;
          this.itemsPerPage = response.itemsPerPage;

         
          response.tweets.forEach(twt => {


            var kk = new Date(twt.created_at)
            var kf = kk.toLocaleDateString()
            //console.log(kf.)
            twt.created_at = (kf)
          
            this.tweets.push(twt);
           /* var options = { year: 'numeric', month: 'long', day: 'numeric' };

            console.log(
              kk.toLocaleDateString("es-ES", options)
            );*/
          });
          
         

        } else {

          console.log(response)
         

        }
      },
      error => {
        const errorMessage = <any>error;
        console.log(errorMessage)
      })

  }
  cancelarBus(){
    this.tweets = []
    this.actualPage2();
    localStorage.clear();
    this._router.navigate(['tweets', 'todos',1]);
  }
  buscar(op){

    if(this.tipo != "busqueda"){
      this.bsq = op;
      localStorage.setItem('bsq', JSON.stringify(this.bsq));
      this._router.navigate(['tweets', 'busqueda']);
    }else{
      this.bsq = op;
      localStorage.setItem('bsq', JSON.stringify(this.bsq));
      this._router.navigate(['tweets', 'busqueda']);
      this.actualPage2()
    }
   
  }
  obtFiltroTweets(op){
    this.busqueda = true;
    var option = op;
    this.tweets = []
    this.status = "process"
    this.tweetSe.obtALLtweets().subscribe(
      response=>{
        this.status = "success"
        response.tweets.forEach(twt => {
          var kk = new Date(twt.created_at)
          twt.created_at = kk.getDay() + "-" + kk.getMonth() + "-" + kk.getFullYear()

          var tt = JSON.parse(twt.sentimientos)

          if (tt.sentiment.document.label == option) {

            this.tweets.push(twt)
            console.log(this.tweets)
          }

        });

      },
      error=>{

      }
      
      
      )
  }
}
