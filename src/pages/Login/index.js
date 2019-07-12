import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

class Login extends Component {
  //Estado com os dados para a tela de login.
  state = { login: '', pass: '' };
  //Evento do click do botão.
  onClickBtn = async () => {
    try {
      //JSON para os dados do login.
      const loginDto = {
        User: this.state.login,
        Pass: this.state.pass
      };

      //Realiza a chamada na API de Login para validar os dados de acesso.
      //O resultado é um JWT Token com Status HTTP 200.
      await axios.post(
        'http://tlr-intelly-malucelli-api.sa-east-1.elasticbeanstalk.com/api/v1.0/login',
        loginDto
      ).then(response => { 
          //Valida o resultado da requisição.
          if (response.status === 200 && response.data.token) {
            //Adiciona na sessão do storage atual.
            sessionStorage.setItem('token', response.data.token);
            //Redireciona para home.
            this.props.history.push('home');
          } 
      })
      .catch(error => {
           
           //Valida se as credenciais estão inválidas.
           if (error.response.status === 403){
             //Limpa o capo da senha.
             this.setState({
                pass: ''
              });

              //Caso diferente de HTTP 200 resultado inválido.
              alert('Usuário e/ou Senha inválido.');             
          }else{
            //Registra o erro desconhecido.
            alert("Erro desconhecido" + error.response.status)
          }
      });
    } catch (error) {
      //Registra o erro da requisição.
      alert(error);
    }
  };

  render() {
    return (
      <div className="container-flex full-page">
        <div className="container-flex login-container">
          <div className="container-flex" style={{ width: '100%' }}>
            <div className="login-heder">
              <div className="outside-circle container-flex">
                <div className="inside-circle" />
              </div>
              <h5>
                Nova plataforma de <br />
                cotação de apólices.
              </h5>
            </div>

            <div className="input-field input-class">
              <label htmlFor="name">Nome</label>
              <input
                className="input-border"
                type="text"
                id="name"
                value={this.state.login}
                onChange={e => this.setState({ login: e.target.value })}
              />
            </div>

            <div className="input-field input-class">
              <label htmlFor="pass">Senha</label>
              <input
                className="input-border"
                type="password"
                id="pass"
                value={this.state.pass}
                onChange={e => this.setState({ pass: e.target.value })}
              />
            </div>
          </div>
          <div className="container-flex actions-container">
            <a href>Esqueceu sua senha?</a>

            <button
              className="btn waves-effect waves-light btn-style"
              name="action"
              onClick={this.onClickBtn}
            >
              Entrar
              <i className="material-icons right">send</i>
            </button>

            <a href>Sou novo aqui</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
