import React, {Component, useState} from 'react'
import './FilterForm.css'
import requestOptions from '../helpers/requestOptions';
import StockTile from './StockTile';

// import filtersHandleClick from '../helpers/filtersHandleClick';

class FilterForm extends Component {
  state={
    featChildren: [],
    techAnalysisChildren: [],
    fundAnalysisChildren: [],
    filterResults: [],
    queryParams: [],
  }

  render(){

  //destructuring objects from our props
  const { features } = this.props.features;
  const { techAnalysis } = this.props.techAnalysis;
  const { fundAnalysis } = this.props.fundAnalysis;
  //objects holding our query param data
  const featureKeys = Object.keys(features)
  const techAnalysisKeys = Object.keys(techAnalysis)
  const fundAnalysisKeys = Object.keys(fundAnalysis)
  //arrays holding the name to be displayed on UI buttons
  const featuresArr = [];
  const techAnalysisArr = [];
  const fundAnalysisArr = [];

  const capClick = (e) => {
    e.preventDefault();

    let queryName = `%22${e.target.id}%22`
    !this.state.queryParams.includes(queryName) && (
      this.setState(prevState => ({
        queryParams: [...prevState.queryParams, queryName]
      }))
    )
    let newParams = this.state.queryParams.filter(param => param != queryName)
    this.state.queryParams.includes(queryName) && (
      this.setState({ queryParams: newParams })
    )

    let btnID = e.target.id;
    document.getElementById(btnID).classList.toggle('active')
  } 

  const analysisClick = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnTitle = techAnalysisArr[btnID]
    let btnQuery = `%22${techAnalysisKeys[btnID]}%22`
    //check if queryParams arr already contains this filter, if it does, we do nothing
    !this.state.queryParams.includes(btnQuery) && (
      this.setState(prevState => ({
        queryParams: [...prevState.queryParams, btnQuery]
      }))
    )
    !this.state.techAnalysisChildren.includes(btnTitle) && (
      this.setState(prevState => ({
        techAnalysisChildren: [...prevState.techAnalysisChildren, btnTitle]
      }))
    )
  }
  const analysisFundClick = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnTitle = fundAnalysisArr[btnID]
    let btnQuery = `%22${fundAnalysisKeys[btnID]}%22`
    //check if queryParams arr already contains this filter, if it does, we do nothing
    !this.state.queryParams.includes(btnQuery) && (
      this.setState(prevState => ({
        queryParams: [...prevState.queryParams, btnQuery]
      }))
    )
    !this.state.fundAnalysisChildren.includes(btnTitle) && (
      this.setState(prevState => ({
        fundAnalysisChildren: [...prevState.fundAnalysisChildren, btnTitle]
      }))
    )
  }
 

  //this function adds a selected feature to our UI as well as state to send as query params

  const featureClick = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnTitle = featuresArr[btnID]
    let btnQuery = `%22${featureKeys[btnID]}%22`    //check if queryParams arr already contains this filter, if it does, we do nothing
    !this.state.queryParams.includes(btnQuery) && (
      this.setState(prevState => ({
        queryParams: [...prevState.queryParams, btnQuery]
      }))
    )

    !this.state.featChildren.includes(btnTitle) && (
      this.setState(prevState => ({
        featChildren: [...prevState.featChildren, btnTitle]
      }))
    )
  }
 


  const fetchData = () => {
    let paramsStr = this.state.queryParams.join(',')
      filterURL.searchParams.append('enabled', paramsStr)
      let reqURL = decodeURI(filterURL)
  
    fetch( reqURL, requestOptions)
      .then(response => response.json())
      .then(data => this.setState({filterResults: data}))
  }

  const toggleFeatures = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnQuery = `%22${featureKeys[btnID]}%22`
    let btnTitle = this.state.featChildren[btnID]

    let displayBtns = this.state.featChildren.filter(child => child != btnTitle)
    let newParams = this.state.queryParams.filter(param => param != btnQuery)


    this.setState({ queryParams: newParams })
    this.setState({ featChildren: displayBtns })
  }

  const toggleTech = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnQuery = `%22${techAnalysisKeys[btnID]}%22`
    let btnTitle = this.state.techAnalysisChildren[btnID]

    let displayBtns = this.state.techAnalysisChildren.filter(child => child != btnTitle)
    let newParams = this.state.queryParams.filter(param => param != btnQuery)

    this.setState({ queryParams: newParams })
    this.setState({ techAnalysisChildren: displayBtns })
  }
  const toggleFund = (e) => {
    let btnID = parseInt(e.target.id.slice(-1))
    let btnQuery = `%22${fundAnalysisKeys[btnID]}%22`
    console.log(this.state.fundAnalysisChildren)
    let displayBtns = this.state.fundAnalysisChildren.filter(child => child != child)
    let newParams = this.state.queryParams.filter(param => param != btnQuery)
    

    this.setState({ queryParams: newParams })
    this.setState({ fundAnalysisChildren: displayBtns })
  }


  //filter functionality
 

  const parseMinMax = () => {
    let priceMin = document.getElementById('priceMin').value;
    let priceMax = document.getElementById('priceMax').value;
    let minQuery = `%22priceMin${priceMin}%22`;    
    let maxQuery = `%22priceMax${priceMax}%22`;
    this.setState(prevState => ({
      queryParams: [...prevState.queryParams, minQuery, maxQuery]
    }))
  }

  const submitFilters = (e) => {
    e.preventDefault()
    parseMinMax();
    fetchData();
  }

  for(let item in features){
    featuresArr.push(features[item])
  }
  for(let item in techAnalysis){
    techAnalysisArr.push(techAnalysis[item])
  }
  for(let item in fundAnalysis){
    fundAnalysisArr.push(fundAnalysis[item])
  }

  //this array will be passed into the JSX to render selected features to screen
  //will need to pass an onClick funtion to these buttons that prevents default and removes them from UI and query params
    const featChildren = this.state.featChildren.map((child, i) => {
      return(
        <button key={i} id={`feat-${i}`} className='filter-btn feat-btns' onClick={toggleFeatures}>{child}</button>
      )
    })
    const techAnalysisChildren = this.state.techAnalysisChildren.map((child, i) => {
      return(
        <button key={i} id={`tech-${i}`} className='filter-btn' onClick={toggleTech} >{child}</button>
      )
    })
    const fundAnalysisChildren = this.state.fundAnalysisChildren.map((child, i) => {
      return(
        <button key={i} id={`fund-${i}`} className='filter-btn' onClick={toggleFund} >{child}</button>
      )
    })

    return(
      
      <div style={{ display: 'flex', flexDirection: 'column', }} className='filterForm'>
        <label id='formLabel'>Filters</label>
        <div className='form-group'>
          <div className='feature-container'>
            <label className='feature-label'>Features</label>

            <div className='feature-btns-active'>
              {featChildren}

            </div>
              <div className='feature-dropdown'>
                <button  className='feature-btn'>&#9660;</button>
                <div className='feature-dropdown-content'>
                {featuresArr.map((feat, i) => (
                <a onClick={featureClick} id={`feat-${i}`} key={i}>{feat}</a>
              ))}
              </div>
            </div>
          </div>          
        </div>
        <div className='form-group' id='marketCap'>
          <label htmlFor='marketCapInput'>Market Cap</label>
          <span className='marketCapBtns'>
            <button className='filter-btn cap-btns' id='largeCap' onClick={capClick}>Large Cap</button>
            <button className='filter-btn cap-btns' id='midCap' onClick={capClick}>Medium Cap</button>
            <button className='filter-btn cap-btns' id='smallCap' onClick={capClick}>Small Cap</button>
          </span>
        </div>
        <div className='form-group'>
          <label htmlFor='priceInput'>Price</label>
          <input className='price-input-fields' type='number' id='priceMin' name='priceMin' placeholder='Min:' />
          <input className='price-input-fields' type='number' id='priceMax' name='priceMax' placeholder='Max:' />
        </div>
        <div className='form-group'>
          <div className='analysis-input'>
            <div className='feature-container'>
              <p className='feature-label'>Technical Analysis</p>
              <div className='feature-btns-active'>
                {techAnalysisChildren}
              </div>
              <div className='feature-dropdown'>
                <button  className='feature-btn'>&#9660;</button>
                <div className='feature-dropdown-content'>
                {techAnalysisArr.map((item, i) => (
                  <a onClick={analysisClick} id={`analysis-${i}`} key={i}>{item}</a>
                ))}
              </div>
            </div>
                  
          <div className='feature-container' id='analysis-container'>
            <p className='feature-label'>Fundamental Analysis</p>
            <div className='feature-btns-active'>
              {fundAnalysisChildren}
            </div>
            <div className='feature-dropdown'>
              <button  className='feature-btn'>&#9660;</button>
              <div className='feature-dropdown-content'>
              {fundAnalysisArr.map((item, i) => (
                <a onClick={analysisFundClick} id={`analysis-${i}`} key={i}>{item}</a>
              ))}
              </div>
            </div>
            <button onClick={submitFilters} className='filter-submit'>Submit</button>
          </div>         
          </div>
          </div> 
        </div>
        {/* <div style={{marginTop: "1em" }}>
                    <div className="wide-card" style={{overflowY: "scroll"}}>
                    {this.state.filterResults ?     
                        <table style={{width: "100%"}}>
                            <thead>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Change</td>
                                <td>Volume</td>
                                <td>Market Cap</td>
                                <td>52 Week High</td>
                                <td>52 Week Low</td>
                            </thead>
                            <tbody>
                                {this.state.filterResults && Object.entries(this.state.filterResults).map((stock, indx) => {
                                    console.log(stock)
                                    return(<StockTile key={indx} ticker={stock[0]} info={stock[1]}/>);
                                })}                        
                            </tbody>
                        </table>
                    : <div style={{textAlign: "center", marginTop: "5%", width: "100%"}}><h3>No results found</h3></div>} 
                    </div>
                </div>
      </div> */}
    )
  }
}

export default FilterForm;