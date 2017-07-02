import React, { Component } from 'react';
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card'
import FontAwesome from 'react-fontawesome'
import debuglogger from 'debug';

let debug = debuglogger('app:components:Candidates:area');

class Area extends Component {
  constructor(props) {
    debug("Area:constructor()")

    super(props)
  }

  render() {
    const candidates = this.props.candidates.map((candidate) => {
      candidate.profile = candidate.age + '歳・' + candidate.sex + '・' + candidate.party + '（' + candidate.type + '）'
      candidate.profile_image_url = candidate.twitter_profile_image_url ? candidate.twitter_profile_image_url : (candidate.facebook_profile_image_url ? candidate.facebook_profile_image_url : null)
      return (
        <Card>
          <CardHeader
            title={candidate.name}
            subtitle={candidate.profile}
            avatar={candidate.profile_image_url }
          />
          <CardText>            
            {candidate.twitter_profile && <p><span style={{ backgroundColor: '#eee', padding: 6, borderRadius: '10px' }}>Twitter</span> {candidate.twitter_profile}</p> }
            {candidate.facebook_profile && <p><span style={{ backgroundColor: '#eee', padding: 6, borderRadius: '10px' }}>Facebook</span> {candidate.facebook_profile}</p> }                        
            {candidate.homepage_description && <p><span style={{ backgroundColor: '#eee', padding: 6, borderRadius: '10px' }}>ホームページ</span> {candidate.homepage_description}</p> }            
            <p>
              <table>
                <tbody>
                  <tr>
                    {candidate.url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.url} target="_blank" rel="noopener noreferrer"><FontAwesome name='home' size='lg' /></a></td>}
                    {candidate.twitter_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.twitter_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='twitter' size='lg' /></a></td>}
                    {candidate.facebook_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.facebook_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' size='lg' /></a></td>}
                    {candidate.instagram_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.instagram_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' size='lg' /></a></td>}
                    {candidate.youtube_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.youtube_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube' size='lg' /></a></td>}
                    {candidate.googleplus_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.googleplus_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='googleplus' size='lg' /></a></td>}
                  </tr>
                </tbody>
              </table>
            </p>
          </CardText>
        </Card>
      );
    });

    return (
      <Card key={this.props.area}>
        <CardHeader
          title={this.props.area}
          showExpandableButton={true}
          actAsExpander={true}
        />
        <CardText expandable={true}>
          {candidates}
        </CardText>
      </Card>
    )

  }
}

export default Area;