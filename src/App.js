import React, { Component } from 'react';
import './App.css';
import Map from'./classes/Map';
import escapeRegExp  from 'escape-string-regexp'



const wikiApi = 'https://pt.wikipedia.org/api/rest_v1/page/summary/';

const markers = [
{
    "id":"marker1",
    "title":"Shopping Praia de Belas",
    "lat":-30.049753,
    "lng":-51.228487,
    "content":"Endereço: Av. Praia de Belas, 1181 - Praia de Belas, Porto Alegre - RS, 90110-001"+
                " Informações 51 3131-1700",
    "title_api":"Praia_de_Belas_Shopping",
    "oficial_site": "https://iguatemi.com.br/praiadebelas/?letra=u"
},
{
    "id":"marker2",
    "title":"Tribunal do Trabalho",
    "lat":-30.048843,
    "lng":-51.227243,
    "content":"O primeiro grau da  Justiça do Trabalho gaúcha é composto por 132 Varas do Trabalho e"+
                " 10 Postos Avançados, distribuídos em 65 municípios. Na capital Porto Alegre estão"+
                " sediadas 30 Varas do Trabalho. O segundo grau é representado pelo Tribunal Regional"+
                " do Trabalho da 4ª Região (TRT), que também funciona como a sede administrativa da"+
                " Instituição no Estado, em Porto Alegre. O TRT-RS possui 11 Turmas Julgadoras e 4 Seções Especializadas."+
                " O quadro da Justiça do Trabalho do Rio Grande do Sul é composto por 48 cargos de desembargadores,"+
                " 247 de juízes do Trabalho e de 3.540 servidores.",
    "title_api":"Tribunal_Regional_do_Trabalho_da_4ª_Região",
    "oficial_site": "https://www.trt4.jus.br/portais/trt4"
},
{
    "id":"marker3",
    "title":"Hospital Mãe de Deus",
    "lat":-30.059043,
    "lng":-51.228868,
    "content":"O Hospital Mãe de Deus atua, desde 1979, oferecendo soluções completas em saúde"+
               ", do diagnóstico ao tratamento, com foco em um atendimento humanizado, seguro e centrado"+
               " na resolubilidade de cada caso. Excelência, proximidade e cuidado com o paciente e a"+
               " constante modernização dos serviços são as diretrizes da instituição.",
    "title_api":"Hospital_Mãe_de_Deus",
    "oficial_site":  "https://www.maededeus.com.br/"
    
},
{
    "id":"marker4",
    "title":"Banco do Brasil",
    "lat":-30.052601,
    "lng":-51.214767,
    "content":"Nosso propósito é estar próximo das pessoas e ajudar a preservar o que é importante"+
                " para nossos clientes, acionistas, funcionários e toda a sociedade",
    "title_api":"banco_do_brasil",
    "oficial_site": "https://www.bb.com.br/pbb/pagina-inicial#/"
},
{
    "id":"marker5",
    "title":"CETE",
    "lat":-30.056588,
    "lng":-51.219673,
    "content":"Uma visão contemporânea sobre a utilização dos espaços públicos norteia o projeto do CETE."+
                " A começar por uma série de adequações nos espaços existentes e da aquisição de materiais"+
                " esportivos do mais alto nível internacional.",
    "title_api":"Centro_Estadual_de_Treinamento_Esportivo",
    "oficial_site": "https://sedactel.rs.gov.br/cete"
}
]

class App extends Component {
    
    constructor(props) {
        super(props);
        this.closeNav = this.closeNav.bind(this);
        this.getContent = this.getContent.bind(this);

    }
    
    state = {
        query:'',
        contentList : '',
        error: null,
        linkTitle:''
      
    }   
  
    updateQuery = (query) => {
      
        this.setState({ query: query})
    }
  
    closeNav(e) {
        e.preventDefault();
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("content").style.marginLeft= "0";
        document.getElementById("buttonOpen").style.display = "block";
        this.setState({contentList:''});
    } 


    getContent(e, title_api, linkTitle){
        e.preventDefault();
        console.log("link clicked "+linkTitle);
        this.setState({linkTitle:linkTitle});
        fetch(wikiApi+title_api)
        .then(res => res.json())
        .then(
        (result) => {
            if(result.title === "Not found."){
                this.setState({
                    contentList: "Desculpa, mas a API não esta retornando as informações"
                });
            }
            else{
                this.setState({
                    contentList: result.extract
                });
            }
        },
        (error) => {
            this.setState({
            contentList: "Desculpa, mas a API não esta retornando informações."
          });
          console.log(error);
        }
        )
     }
  
    render() {
    
        let showingMarkers
        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query),'i')
            showingMarkers = markers.filter((marker) => match.test(marker.title))
        }else{
            showingMarkers = markers
        }
      
        return (<div className="wrap">
                    <div id="mySidenav" className="sidenav">
                        <a href="" className="closebtn" onClick={ e => this.closeNav(e)}>&times;</a>
                        <h3>Menino Deus - POA </h3>
                        <input 
                            type="text"
                            placeholder="Digite para filtrar..."
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                        <div id="list" className="listDecoration">
                           {showingMarkers.map((markers) => (
                               <a href="" id={markers.id} key={markers.id} onClick={ e => this.getContent(e, markers.title_api, markers.title )} >{ markers.title }</a>))}
                        </div>
                        <div id="sideContent">
                            {this.state.contentList !== '' &&
                                <p className="round">{this.state.contentList}</p>
                            }
                        </div>
                    </div>
                    <Map markers={showingMarkers} linkTitle={this.state.linkTitle}/>
                </div>
               );
    }
}

export default App;
