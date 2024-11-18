# PharmaExpress
<p>Aplicativo desenvolvido para a gestão de movimentações e entregas, principalmente utilizando React Native e Javascript, TypeScript e Backend em Node.js utilizando express e multer.</p>
<h1>Uma visão geral do projeto</h1>
<p>Este README fornece uma visão de como o aplicativo está estruturado e funcionando, com capturas de tela para uma demonstração visual.</p>

<h1>Tela de introdução</h1>
<p>Está é a primeira tela ao abrir o app, escolhi a paleta de cores cochineal e a imagem foi gerada pela ia da microsoft designer</p>

<img src="https://github.com/user-attachments/assets/47743531-8800-4f66-a756-4b9a7cec96d5" alt="messages" width="425" height="800">

<h1>Tela de login</h1>
<p>Segunda tela após a tela de introdução, necessário efetuar login caso esteja abrindo o app pela primeira vez ou trocando de perfil</p>
<img src="https://github.com/user-attachments/assets/1d838df5-f79d-4204-8b5a-5416878c439b" alt="messages" width="425" height="800">

<h1>Perfis</h1>
<p>Agora uma representação visual com captura de telas sobre quais telas cada perfil tem privilégio de visualização e acesso.</p>

<h2>Administrador</h2>
<p>O administrador do sistema terá acesso as seguintes telas:</p>
<ul>
  <h3>Tela de gerenciamento de usuarios e estoque</h3>
    <img src="https://github.com/user-attachments/assets/3cf1609d-5518-460e-9cad-20c81d2d56bb" alt="messages" width="425" height="800">
  <h3>Tela de listagem de usuários</h3>
  <img src="https://github.com/user-attachments/assets/17fb2432-7045-4ed9-8b7c-9356843ad534" alt="messages" width="425" height="800">
  <h3>Tela de cadastro de usuários<h3>
    <img src="https://github.com/user-attachments/assets/b2a4ed65-b6b6-46f2-9847-4a35108a45ef" alt="messages" width="425" height="800">
    <h4>Picker para selecionar o perfil desejado</h4>
    <img src="https://github.com/user-attachments/assets/8de0adce-ef00-4b94-a87e-33aa786d2889" alt="messages" width="425" height="800">
  <h3>Tela de visão de estoque</h3>
  <img src="https://github.com/user-attachments/assets/9502644b-3dc1-4eff-bf22-5e7464998615" alt="messages" width="425" height="800">
</ul>

<h2>Filiais</h2>
<p>Os perfis cadastrados como filiais, terão acesso as seguintes telas:</p>
<ul>
  <h3>Tela de listagem de movimentações</h3>
    <img src="https://github.com/user-attachments/assets/b864ed92-4a3b-4980-9a59-0e7e8794c4fb" alt="messages" width="425" height="800">
  <h3>Modal para cadastro de movimentações</h3>
  <img src="https://github.com/user-attachments/assets/b1913d2b-11ce-4ef3-af5c-af113cb0fb4d" alt="messages" width="425" height="800">
</ul>

<h2>Motoristas</h2>
<p>Os perfis cadastrados como motoristas, terão acesso as seguintes telas:</p>
<ul>
  <h3>Tela de listagem de movimentações disponíveis para coleta/entrega</h3>
    <img src="https://github.com/user-attachments/assets/216b9fe2-35c9-4c4d-a418-221ea4789235" alt="messages" width="425" height="800">
  <h3>Mapa para exibir origem e destino da entrega</h3>
  <img src="https://github.com/user-attachments/assets/a1f84301-8a36-4e0c-acad-2b661164941c" alt="messages" width="425" height="800">
</ul>

<h1> Funcionalidades </h1>
<ul>
  <li>Gerenciamento de estoque, usuários e cadastro de novos usuários, podendo desativar ou ativar cada perfil.</li>
  <li>Privilégio de visualização e acesso gerenciados por perfis</li>
  <li>Gerenciamento e criação de novas movimentações entre filiais, agilizando o processo de entrega</li>
  <li>Motorista pode iniciar e finalizar coleta com seu perfil e consultar o mapa conforme informações da coleta selecionada</li>
  <li>App user-friendly e de fácil acesso, necessitando apenas de uma breve introdução ao app, economizando tempo e custos de treinamento</li>
</ul>

<h1>Tecnologias utilizadas</h1>
<ul>
  <li>React Native: framework para desenvolvimento de software móvel em iOS e Android.</li>
  <li>Backend em Node.js com express e multer utilizando sqlite.</li>
  <li>JavaScript: a linguagem de programação utilizada, com algumas funções e variáveis tipadas em TypeScript para tornar o código mais limpo.</li>
  <li>Expo: ferramenta usada para simplificar a emulação e os testes do aplicativo.</li>
  <li>Android Studio: usado para emular um dispositivo Android e verificar o andamento do desenvolvimento.</li>
</ul>

<p>Você pode verificar todas as bibliotecas utilizadas neste projeto simplesmente conferindo as dependências no arquivo package-lock.json ou na lista abaixo.</p>
<p><strong>Certifique-se de sempre executar o comando npm install, que instalará todas as bibliotecas listadas no arquivo package-lock.json.</strong></p>
<p>Novas funções e refatorações serão adicionadas no futuro, caso solicitado.</p>

<h1>Dependências (bibliotecas)</h1>

<ul>
  <li>@expo/vector-icons ver. 14.0.4</li>
  <li>@react-native-async-storage/async-storage ver. 2.0.0</li>
  <li>@react-native-picker/picker ver. 2.7.5</li>
  <li>@react-navigation/native ver. 6.1.18</li>
  <li>@react-navigation/stack ver. 6.4.1</li>
  <li>axios ver. 1.7.7</li>
  <li>expo ver. 51.0.28</li>
  <li>expo-image-picker ver. 15.0.7</li>
  <li>expo-location ver. 17.0.1</li>
  <li>expo-status-bar ver. 1.12.1</li>
  <li>react ver. 18.2.0</li>
  <li>react-native ver. 0.74.5</li>
  <li>react-native-gesture-handler ver. 2.20.0</li>
  <li>react-native-maps ver. 1.18.2</li>
  <li>react-native-paper ver. 5.12.5</li>
  <li>react-native-safe-area-context ver. 4.11.1</li>
  <li>react-native-screens ver. 3.34.0</li>
</ul>









