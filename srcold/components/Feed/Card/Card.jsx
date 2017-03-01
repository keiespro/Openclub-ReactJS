import React, { Component, PropTypes } from 'react';

class Card extends Component {
  static propTypes = {
    content: PropTypes.object,
    key: PropTypes.number
  }
  constructor(props) {
    super(props);
  }
  renderCardOwner() {
    const { content } = this.props;
    const owner = content.owner;
    return (
      <div className="media m0">
          <div className="media-left">
            <a href={'url' in owner ? owner.url : '#'}>
              <img src={owner.photo.thumb} alt={owner.name} className="media-object img-circle thumb48"/>
            </a>
          </div>
          <div className="media-body media-middle pt-sm">
              <p className="media-heading m0 text-bold">{owner.name}</p>
              <small className="text-muted">
                  <i className="fa fa-globe text-muted mr-sm" />
                  <span className="mr-sm">2 hours ago</span>
                  <span> • </span>
                  <i className="fa fa-users text-muted mr-sm ml-sm" />
                  <span>{owner.associated_name || ''}</span>
              </small>
          </div>
      </div>
    );
  }
  renderCardContent() {
    const { content } = this.props;
    let card = [];
    if (content.photos.length === 1) {
      let photo = content.photos[0];
      card.push(
        <a key={0} href={photo.uri}>
          <img
            src={photo.full_size}
            alt={photo.caption}
            className="fw img-responsive"
          />
        </a>
      );
    }
    if (content.photo.length > 1) {
      content.photos.map((value, key) => {
        card.push(
          <a key={key} href={value.uri}>
            <img
              src={value.thumb}
              alt={value.caption}
              className="mr-sm thumb48"
            />
          </a>
        )
      });
    }
    if ('text' in content && content.text.length > 0) {
      card.push(
        <div key="text" className="p">
          {content.text}
        </div>
      )
    }
    return card;
  }
  render() {
    const { content } = this.props;
    const counts = {
      like: 0,
      comment: 0
    }
    return (
      <div className="card-body" key={'key' in this.props ? this.props.key : 0}>
          {/* Inner card */}
          <div className="card">
              <div className="card-heading">
                {renderCardOwner()}
                <div className="pull-right">
                    <Dropdown pullRight id="123">
                        <Dropdown.Toggle bsStyle="link" noCaret className="btn-flat btn-flat-icon">
                          <i className="fa fa-ellipsis-v"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="md-dropdown-menu" >
                            <MenuItem eventKey="1">Go to BMW Club Queensland</MenuItem>
                            <MenuItem eventKey="2">Stop following</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="3">Report</MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {renderCardContent()}
              </div>
              <div className="card-footer">
                  <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-heart-o" /> {counts.like > 0 ? `(${counts.like})` : ''}</button>
                  <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-comments" /> {counts.like > 0 ? `(${counts.comment})` : ''}</button>
                  <button type="button" className="btn btn-flat btn-primary"><i className="fa fa-share" /></button>
              </div>
          </div>
      </div>
    );
  }
}
export default Card;
