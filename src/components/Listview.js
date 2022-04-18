import React, { useState, useEffect } from 'react';
import { Button, Card, Header, Modal, Input } from 'semantic-ui-react';
import './listview.css';

function Listview() {
    const [open, setOpen] = useState(false);
    const [favorite, setFavorite] = useState([]);
    const [searchdata, setSearchData] = useState("");
    const [moredetails, setMoreDetails] = useState();
    const [loader, setLoader] = useState(true);
    const [apichange, setApichange] = useState("");

    useEffect(() => {
        setLoader(true);
        const url = `https://api.github.com/search/repositories?q=${searchdata ? searchdata : "javascript"}`;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((parsedData) => {
                setLoader(false);
                setFavorite(parsedData.items || []);
            })
    }, [apichange])

    const openmodal = (datas) => {
        setOpen(true);
        setMoreDetails(datas);
    }

    const handleSearch = () => {
        setApichange(searchdata);
    }

    return (
        <div className='style-inputbox'>
            {loader ? <div>Loading...</div> :
                <>
                    <Input icon='search' placeholder='Search by Github name' value={searchdata} onChange={(e) => setSearchData(e.target.value)} />
                    <button class="ui primary button" onClick={handleSearch}>Search</button>
                    <div className='full-ctn'>
                        {favorite.length === 0 && <div className='nodata-found'>No data found</div>}
                        {favorite.map((data, index) => {
                            return (
                                <Card key={index}>
                                    <Card.Content header={data.name} />
                                    <Card.Content className="descrip-ctn" description={data.description} />
                                    <div className='langbar-style'>
                                        <div>{data.language}</div>
                                        <a target="_blank" href={data.owner.html_url}>Link</a>
                                    </div>
                                    <Card.Content extra className='more-container'>
                                        <div className='login-style'>{data.owner.login}</div>
                                        <Modal
                                            closeIcon
                                            open={open}
                                            trigger={<Button primary>More</Button>}
                                            onClose={() => setOpen(false)}
                                            onOpen={() => openmodal(data)}
                                        >
                                            <Header icon='archive' content=' Repository Details' />
                                            <Modal.Content className='modal-style'>
                                                <p><span className='design-text'>Name:</span>{moredetails?.name}</p>
                                                <p><span className='design-text'>Full Name:</span>{moredetails?.full_name}</p>
                                                <p><span className='design-text'>Language:</span>{moredetails?.language}</p>
                                                <p><span className='design-text'>Login:</span>{moredetails?.owner.login}</p>
                                                <p><span className='design-text'>Type:</span>{moredetails?.owner.type}</p>
                                                <p><span className='design-text'>url:</span>{moredetails?.owner.url}</p>
                                                <p><span className='design-text'>License:</span>{moredetails?.license.name}</p>
                                                <p><span className='design-text'>Description:</span>{moredetails?.description}</p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color='red' onClick={() => setOpen(false)}>
                                                    Close
                                                </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </Card.Content>
                                </Card>
                            )
                        })
                        }
                    </div>
                </>}
        </div>
    )
}
export default Listview;
