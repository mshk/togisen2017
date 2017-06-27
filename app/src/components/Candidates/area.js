import React, { Component } from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card'
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
              <p>
                都民ファーストの会　都政改革委員（千代田区担当） ひぐちたかあき です。昭和57年8月生まれ、34歳。家族は妻と娘(2歳)。巣鴨学園高、京都大学法学部卒業後、電通国際情報サービスにて営業職、製造業担当7年。「ちよだに寄りそい、共に歩む」都民の皆さんの暮しに寄りそった、新しい政策を進めていきます。
              </p>  
              <table>
                <tbody>
                  <tr>
                    {candidate.url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.url} target="_blank" rel="noopener noreferrer"><FontAwesome name='home' size='1x' /></a></td> }
                    {candidate.twitter_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.twitter_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='twitter' size='1x' /></a></td> }
                    {candidate.facebook_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.facebook_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' size='1x' /></a></td> }
                    {candidate.instagram_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.instagram_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' size='1x' /></a></td> }
                    {candidate.youtube_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.youtube_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube' size='1x' /></a></td> }
                    {candidate.googleplus_url && <td style={{ width: '3em', textAlign: 'left' }}><a href={candidate.googleplus_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='googleplus' size='1x' /></a></td> }
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
                { candidates }
        </CardText>        
      </Card>
    )

  }
}

export default Area;