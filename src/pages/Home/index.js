import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import user from '../../assets/intelly_user.png';

class Login extends Component {
  //Inicia as variavéis.
  state = { name: '', email: '', linkedin: '', role: '' };
  //Carrega as informações do usuário.
  async componentDidMount() {
    try {
      //Recupera o token do usuário da sessão do storage.
      const token = sessionStorage.getItem('token');
      
      //Realiza a chamada a api.
       const userData = await axios.get('https://api.promocoes.curitiba.br/api/v1.0/users/me', {
          headers: { Authorization: `Bearer ${token}` }
       });

      //Define o valor dos campos.
      this.setState({ name: userData.data.name,
                      email: userData.data.email,
                      linkedin: userData.data.linkedin,
                      role: userData.data.role  });
                      
    } catch (error) {
      alert(error);
    }
  }
  render() {
    return (
      <div className="container-flex full-page">
        <div className="container-flex">
          <div className="container-flex-user user-data-container">
            <img src={user} alt="Perfil" className="avatar z-depth-4" />
            <p className="nome-label">{this.state.name}</p>
            <p className="email-label">{this.state.role}</p>
            <p className="email-label">{this.state.email}</p>            
            <p className="email-label"><a href={this.state.linkedin} target='_blank' > Linkedin </a>   </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
