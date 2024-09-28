Este projeto com uma **arquitetura modular baseada em Domain-Driven Design (DDD)**, com características de 
**Clean Architecture e Arquitetura Hexagonal**.

### 1. Arquitetura Modular
A arquitetura modular separa a aplicação em diferentes módulos independentes, cada um responsável por uma área ou funcionalidade 
específica do negócio. Cada módulo tem suas próprias camadas (domínio, casos de uso, infraestrutura), permitindo que o código seja 
desacoplado e escalável.

### 2. Domain-Driven Design (DDD)
O DDD é uma abordagem que organiza a aplicação em torno do **domínio de negócio**. A arquitetura segue conceitos do DDD ao colocar o 
**domínio (lógica de negócio)** no centro, isolando-o de detalhes técnicos, como a infraestrutura ou a interface do usuário.<br> 

  **Camadas principais do DDD:**

  - **Domain (Domínio):** O coração da aplicação, onde as entidades de negócio e regras principais são modeladas.
  - **Application (Aplicação):** Orquestra as operações de negócio e coordena a execução dos casos de uso.
  - **Infrastructure (Infraestrutura):** Lida com detalhes técnicos como persistência de dados, redes, ou APIs externas.
  - **Presentation (Apresentação):** Interage com o mundo exterior, como APIs, interfaces gráficas ou clientes externos.

### 3. Clean Architecture
A **Clean Architecture** organiza o código de forma que as regras de negócio sejam completamente independentes de detalhes técnicos, 
como frameworks ou bancos de dados. Uma característica fundamental é a **separação clara entre camadas** e a **dependência invertida**, 
onde o domínio não depende de infraestrutura ou detalhes externos.<br>

  **Principais conceitos da Clean Architecture:**

  - **Regras de Negócio no Centro:** O código de domínio deve ser o mais puro possível, sem dependências de bibliotecas externas.
  - **Casos de Uso como Camada de Orquestração:** Os casos de uso são responsáveis por coordenar as interações entre o domínio e as 
  outras partes da aplicação (infraestrutura e apresentação).
  - **Dependência Invertida:** A infraestrutura depende do domínio e dos casos de uso, nunca o contrário.

### 4. Arquitetura Hexagonal (Ports and Adapters)
A **Arquitetura Hexagonal** (também conhecida como **Ports and Adapters**) reforça o princípio de **isolamento do núcleo de negócio** por 
meio de **portas (interfaces)** e **adaptadores (implementações externas)**. Isso permite que a lógica de negócio seja agnóstica a detalhes 
técnicos como bancos de dados, interfaces gráficas, ou serviços externos.</br>

  **Elementos da Arquitetura Hexagonal:**
  - **Ports (Portas):** Interfaces que o domínio e os casos de uso expõem para que outros sistemas interajam com eles (ex: controladores de 
  API).
  - **Adapters (Adaptadores):** Implementações externas que conectam o núcleo da aplicação com serviços como bancos de dados, APIs externas, 
  ou bibliotecas.


### Diretorios
`main`
A pasta `main` contém o ponto de entrada e a configuração global da aplicação. É responsável por inicializar e configurar a infraestrutura 
(como banco de dados, servidores e serviços externos) e definir adaptadores globais. Basicamente, ela centraliza as configurações e a 
inicialização da aplicação como um todo.

`modules`
A pasta `modules` organiza as funcionalidades da aplicação por domínio. Cada módulo encapsula sua própria lógica de negócio, casos de uso, 
controladores, e infraestrutura, seguindo uma abordagem modular. Isso facilita a separação de responsabilidades, tornando o código mais 
organizado e escalável. Cada módulo é independente, focado em um contexto específico da aplicação.



### Exemplo de estrutura de pastas

```bash
src
├── main
│   ├── infra
│   ├── adapters
│   └── etc...
├── modules
│   └── mentored
│       ├── types
│       ├── contracts
│       │   ├── controllers
│       │   └── usecases
│       ├── domain
│       │   ├── aggregates
│       │   ├── entities   
│       │   └── value-objects
│       ├── application
│       │   ├── presentation
│       │   │   ├── controllers
│       │   │   └── validators
│       │   └── usecases
│       ├── factories
│       │   ├── controllers
│       │   ├── usecases
│       │   └── infra
│       ├── infra
│       └── errors

```

`src/main`
- **infra:** Responsável pela infraestrutura do sistema, incluindo bancos de dados, provedores de serviços externos, ou 
integrações com outras plataformas.
- **adapters:** Contém adaptadores que fazem a ligação entre bibliotecas/frameworks e a aplicação, convertendo interfaces 
e dados.
- **etc...:** Outras pastas que podem conter módulos ou funcionalidades gerais da aplicação.

`src/modules/mentored`
- **types:** Contém definições de tipos ou interfaces utilizadas pelo módulo, como tipagens TypeScript que facilitam o uso 
de dados fortemente tipados em todo o projeto (`types`, `model`, `dto`).
- **contracts:** Definições de contratos ou interfaces entre diferentes partes do sistema.
- **domain:** O núcleo da lógica de negócios, onde o domínio da aplicação é modelado.
  - **aggregates/entities:** Representa as entidades principais do domínio e seus agregados, que agrupam entidades menores que fazem 
  sentido juntas.
  - **value-objects:** Objetos de valor que são imutáveis e comparados por seus valores, e não por identidade.
- **application:** Contém a camada de aplicação, que orquestra as operações de negócio e se comunica com as interfaces externas.
  - **presentation:** Lida com a apresentação e comunicação com os clientes (API, UI).
    - **controllers:** Controladores responsáveis por lidar com as requisições.
    - **validators:** Validadores que garantem que as entradas estejam no formato adequado antes de serem processadas.
  - **usecases:** Implementações dos casos de uso, que são as operações principais da aplicação.
- **factories:** Fornece instâncias pré-configuradas de objetos, facilitando a criação de componentes com valores padrão.
- **infra:** Espelha a pasta main/infra, mas focada nas implementações específicas desse módulo, como acesso ao banco de dados ou serviços 
externos.
- **errors:** Armazena classes ou tipos de erros específicos do módulo, permitindo tratamento de erros customizado.

</br>
</br>
</br>
</br>

**[Voltar ao Readme](../README.md)**