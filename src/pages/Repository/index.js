import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Loading, Owner, IssueList } from './styles';
import Container from '../../Components/Container';

// Classe que representa a exibição do repositorio vindo por parametro
export default class Repository extends Component {
    // Definindo a estrutura dos parametros que essa rota aceita
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    //Controles de estado
    state = {
        repository: {},
        issues: [],
        loading: true,
    };

    //Ao inicializar a pagina
    async componentDidMount() {
        const { match } = this.props;
        const repoName = decodeURIComponent(match.params.repository);

        try {
            const [repository, issues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'open',
                        per_page: 5,
                    },
                }),
            ]);

            this.setState({
                repository: repository.data,
                issues: issues.data,
                loading: false,
            });
        } catch (error) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { repository, issues, loading } = this.state;

        if (loading) {
            return <Loading>Carregando</Loading>;
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar ao repositórios</Link>
                    <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <IssueList>
                    {issues.map((issue) => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login} />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map((label) => (
                                        <span key={String(label.id)}>{label.name}</span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}
