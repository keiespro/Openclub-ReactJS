import React, { Component, PropTypes } from 'react';

class ClubView extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section>
                <h1>Club Promo Content</h1>
            </section>
        );
    }
}
export default ClubView;
