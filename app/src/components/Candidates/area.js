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
      return (
          <TableRow 
            key={candidate.name + candidate.id} 
            selectable={false}            
          >
            <TableRowColumn>{candidate.name}</TableRowColumn>
            <TableRowColumn>{candidate.kana}</TableRowColumn>            
            <TableRowColumn>{candidate.sex}</TableRowColumn>                        
            <TableRowColumn>{candidate.age}</TableRowColumn>                        
            <TableRowColumn>{candidate.party}</TableRowColumn>                        
            <TableRowColumn>{candidate.type}</TableRowColumn>                                    
            <TableRowColumn>
              <table>
                <tbody>
                  <tr>
                    {candidate.url && <td><a href={candidate.url} target="_blank" rel="noopener noreferrer"><FontAwesome name='home' size='2x' /></a></td> }
                    {candidate.twitter_url && <td><a href={candidate.twitter_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='twitter' size='2x' /></a></td> }
                    {candidate.facebook_url && <td><a href={candidate.facebook_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='facebook' size='2x' /></a></td> }
                    {candidate.instagram_url && <td><a href={candidate.instagram_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='instagram' size='2x' /></a></td> }
                    {candidate.youtube_url && <td><a href={candidate.youtube_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='youtube' size='2x' /></a></td> }
                    {candidate.googleplus_url && <td><a href={candidate.googleplus_url} target="_blank" rel="noopener noreferrer"><FontAwesome name='googleplus' size='2x' /></a></td> }
                </tr>
                </tbody>
              </table>
            </TableRowColumn>                                                                                                            
          </TableRow>
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
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>名前</TableHeaderColumn>
                <TableHeaderColumn>よみ</TableHeaderColumn>                
                <TableHeaderColumn>性別</TableHeaderColumn>                                                
                <TableHeaderColumn>年齢</TableHeaderColumn>                                                                
                <TableHeaderColumn>党派</TableHeaderColumn>   
                <TableHeaderColumn>新 現 元</TableHeaderColumn>   
                <TableHeaderColumn>ウェブサイト・SNS</TableHeaderColumn>   
              </TableRow>                
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
                { candidates }
            </TableBody>                        
          </Table>
        </CardText>        
      </Card>
    )

  }
}

export default Area;