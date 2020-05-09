import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton, List } from './styles';
import api from '../../services/api';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    // Carregar os dados do localstorage
    componentDidMount() {
        const repositoriesStorage = localStorage.getItem('repositories');
        if (repositoriesStorage) {
            this.setState({ repositories: JSON.parse(repositoriesStorage) });
        }
    }

    // Salvar os dados no localStorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    // Ao digitar no campo atualiza o newRepo
    handleInputChange = (e) => {
        this.setState({ newRepo: e.target.value });
    };

    // Evento de consultar o Git
    handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Consultou');
        const { newRepo, repositories } = this.state;

        this.setState({ loading: true });

        const response = await api.get(`/repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };

    // Renderizando a tela
    render() {
        const { newRepo, repositories, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar Repositório"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton carregando={loading}>
                        {loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#fff" size={14} />}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map((repo) => (
                        <li key={repo.name}>
                            <span>{repo.name}</span>
                            <a href="aaaaaa">Detalhes</a>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
