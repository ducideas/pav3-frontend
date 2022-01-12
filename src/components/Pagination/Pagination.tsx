import * as React from 'react';

export interface Props {
    onChange: (page: number) => void;
    page: number;
    numberOfItem: number;
    numberOfItemPerPage: number;
    length: number;
}

export interface State {
    items: Array<number>;
}

class Pagination extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            items: this.createListItems(1, props.length)
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps: Props): void {
        const { page, length } = nextProps;
        const { items } = this.state;
        const maxPage = this.maxPage();
        if (page < items[0] || page > items[items.length - 1]) {
            if (page === 1) {
                this.setState({
                    items: this.createListItems(1, length)
                });
            } else if (page === maxPage) {
                this.setState({
                    items: this.createListItems(maxPage + 1 - length, length)
                });
            } else if (page < items[0]) {
                this.setState({
                    items: this.createListItems(page, length)
                });
            } else {
                this.setState({
                    items: this.createListItems(page + 1 - length, length)
                });
            }
        }
    }

    firstPage = (): void => {
        const { onChange, page } = this.props;
        if (page > 1) {
            onChange(1);
        }
        console.log("First Page");
        
    }

    prevPage = (): void => {
        const { onChange, page } = this.props;
        if (page > 1) {
            onChange(page - 1);
        }
    }

    nextPage = (): void => {
        const { onChange, page } = this.props;
        const maxPage = this.maxPage();
        if (page < maxPage) {
            onChange(page + 1);
        }
    }

    lastPage = (): void => {
        const { onChange, page } = this.props;
        const maxPage = this.maxPage();
        if (page < maxPage) {
            onChange(maxPage);
        }
    }

    switchPage = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        const { onChange } = this.props;
        const maxPage = this.maxPage();
        const page = Number(e.currentTarget.getAttribute('data-id'));
        if (page <= maxPage) {
            onChange(page);
        }
    }

    maxPage = (): number => {
        const { numberOfItem, numberOfItemPerPage } = this.props;
        return Math.ceil(numberOfItem / numberOfItemPerPage);
    }

    createListItems = (start: number, length: number): Array<number> => {
        return Array.from(Array(length), (_, i) => i + start);
    }

    render(): JSX.Element {
        const { page, numberOfItem, numberOfItemPerPage } = this.props;
        const { items } = this.state;
        const maxPage = this.maxPage();
        const pagingInfo = (page - 1) * numberOfItemPerPage + 1 + ' - '
            + (page === maxPage ? numberOfItem : page * numberOfItemPerPage) + ' of ' + numberOfItem + ' items';

        return (
            <nav aria-label="Page navigation example" className="d-flex justify-content-between">
                <div className="text-black-50">
                    {maxPage === 0 ? '0 of 0 items' : pagingInfo}
                </div>
                <ul className="pagination ml-auto mb-1">
                    <li {...page <= 1 ? { className: 'page-item disabled',style:{display:'none'} } : { className:'page-item', style: { cursor: 'pointer',display:'inline' } }}>
                        <a className="page-link" onClick={this.firstPage}>
                            <span aria-hidden="true"><i className="fas fa-step-backward" /></span>
                        </a>
                    </li>
                    <li {...page <= 1 ? { className: 'page-item disabled',style:{display:'none'} } : { className:'page-item', style: { cursor: 'pointer',display:'inline' } }}>
                        <a className="page-link" onClick={this.prevPage}>
                            <span aria-hidden="true"><i className="fas fa-caret-left fa-lg" /></span>
                        </a>
                    </li>
                    {
                        items.map(x =>
                            <li
                                key={x}
                                style={x <= maxPage ? { cursor: 'pointer',display:'inline' } : {display:'none'}}
                                className={x > maxPage ? 'hide' : x === page ? 'page-item active' : 'page-item'}
                            >
                                <a className="page-link" data-id={x} onClick={this.switchPage}>{x}</a>
                            </li>
                        )
                    }
                    <li {...page >= maxPage ? { className: 'page-item disabled',style:{display:'none'} } : { className:'page-item', style: { cursor: 'pointer',display:'inline' } }}>
                        <a className="page-link" onClick={this.nextPage} >
                            <span aria-hidden="true"><i className="fas fa-caret-right fa-lg" /></span>
                        </a>
                    </li>
                    <li {...page >= maxPage ? { className: 'page-item disabled',style:{display:'none'} } : { className:'page-item', style: { cursor: 'pointer',display:'inline' } }}>
                        <a className="page-link" onClick={this.lastPage}>
                            <span aria-hidden="true"><i className="fas fa-step-forward" /></span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;