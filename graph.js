import React, { Component } from 'react'
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';
import { graphObject } from '../helpers/graphObject';
import './GraphCard.css'

class GraphCard extends Component {
    state={
        currentBtn: 0,

        graphData: graphObject(this.props.sp.data),

    }
   
    render(){
        
        const { dow, nasdaq, sp } = this.props;
        
        const graphIdMap = {
            0: sp,
            1: dow,
            2: nasdaq
        }

        const toggleGraph = (id) => {
            let graphID = graphIdMap[id];
            let graphData = graphObject(graphID.data);
            return graphData;
        }
        
        const graphBtnToggleActive = (e) => {
            this.setState({currentBtn: e.target.id})
            //If clicked button is already selected, return
            if (e.target.style.backgroundColor !== "rgb(14, 71, 73)") {
                //Otherwise look for button to change background
                let buttons = document.getElementsByClassName("graphBtn");
                Array.from(buttons).forEach((btn, indx) => {
                    //Change button to active
                    if (indx == e.target.id) {
                        btn.style.backgroundColor = "rgb(14, 71, 73)";
                        btn.style.color = "white";
                    }
                    //Change previously active button to inactive 
                    else if (btn.style.backgroundColor === "rgb(14, 71, 73)") {
                        btn.style.backgroundColor = "transparent";
                        btn.style.color = "black";
                    }
                });
            }
            this.setState(() => ({ graphData: toggleGraph(this.state.currentBtn) }))
        }
    
      
    return(
        <div className='graph-container'>
            <div className='graph-btns'>
                <button id="0" className="graphBtn" role="button" onClick={graphBtnToggleActive} style={{borderRadius: "6px", font: "Merriweather", fontSize: ".9em", color: "white", padding: "4%", whiteSpace: "nowrap", display: "block", margin: "4% auto 4% auto", backgroundColor: "#0e4749", border: "none", transitionProperty:"all", transitionDuration: "0.3s"}}>
                    {sp.name}<br/>
                    {`${sp.data.current.last.toFixed(2)} | ${sp.data.current.change.toFixed(2)}`}
                </button>
                <button id="1" className="graphBtn" role="button" onClick={graphBtnToggleActive} style={{borderRadius: "6px", font: "Merriweather", fontSize: ".9em", padding: "4%", whiteSpace: "nowrap", display: "block", margin: "4% auto 4% auto", backgroundColor: "transparent", border: "none", transitionProperty:"all", transitionDuration: "0.3s"}}>
                    {dow.name}<br/>
                    {`${dow.data.current.last.toFixed(2)} | ${dow.data.current.change.toFixed(2)}`}            
                </button>
                <button id="2" className="graphBtn" role="button" onClick={graphBtnToggleActive} style={{borderRadius: "6px", font: "Merriweather", fontSize: ".9em", padding: "4%", whiteSpace: "nowrap", display: "block", margin: "4% auto 4% auto", backgroundColor: "transparent", border: "none", transitionProperty:"all", transitionDuration: "0.3s"}}>
                    {nasdaq.name}<br/>
                    {`${nasdaq.data.current.last.toFixed(2)} | ${nasdaq.data.current.change.toFixed(2)}`}
                </button>
            </div>
            
            <div className='graph-image'>
                <VictoryChart domainPadding={{x: []}}>
                    <VictoryLine
                        style={{
                            data: { stroke: '#0E4749' }
                        }}
                        data={this.state.graphData}
                        x='time'
                        y='price'
                    />
                    <VictoryAxis crossAxis
                        tickValues={[10, 11, 12, 13, 14, 15, 16]}
                        tickFormat={(t) => {
                            if(t == 12){
                                return `${t}pm`
                            } else if (t > 12){
                                t -= 12;
                                return `${t}pm`;
                            } else {
                                return `${t}am`;
                            }
                        }}                
                    />
                    <VictoryAxis dependentAxis
                        
                        style={{
                            tickLabels: {}
                        }}
                        tickFormat={(t) => {
                            return `${t}`
                        }}
                    />
                </VictoryChart>
            </div>
        </div>

    );
    }
}

export default GraphCard;