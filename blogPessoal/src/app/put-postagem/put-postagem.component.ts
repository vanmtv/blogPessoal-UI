import { Component, OnInit } from '@angular/core';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';
import { PostagemService } from '../service/postagem.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-put-postagem',
  templateUrl: './put-postagem.component.html',
  styleUrls: ['./put-postagem.component.css']
})
export class PutPostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  
  constructor(
    private postagemService: PostagemService,
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.findAllTemas()
  }

  ngOnInit(){
    window.scroll(0,0)
    this.idPost = this.route.snapshot.params["id"]  
    this.findByIdPostagem(this.idPost)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp
    })
  }

  

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }


  salvar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.router.navigate(['/feed'])
      alert('Postagem alterada com sucesso')
    }, err => {
      if(err.status == '500'){
        alert('Preencha todos os campos corretamente antes de enviar!')
      }
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }
}
