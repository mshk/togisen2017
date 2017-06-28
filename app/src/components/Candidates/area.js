import React, { Component } from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import FontAwesome from 'react-fontawesome'

import debuglogger from 'debug';
let debug = debuglogger('app:components:Candidates:area');

class Area extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { className, ...props } = this.props;
    const candidates = this.props.candidates.map((candidate) => {
      candidate.profile = candidate.age + '歳・' + candidate.sex + '・' + candidate.party + '（' + candidate.type + '）'
      return (
        <Card>
          <CardHeader
            title={candidate.name}
            subtitle={candidate.profile}
          />
          <CardText>
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