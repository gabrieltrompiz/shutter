import React from 'react';
import { Container, Image, Divider } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player'
import Slider from "react-slick";

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.post;
	}

	componentDidMount = () => {
		this.setState({ date: 'loading...'})
		setInterval(() => this.setState({ date: this.getBeautifiedDate() }), 1000)
	}

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.state.creationTime) / 1000)
		const date = new Date(this.state.creationTime)
		if(seconds < 0) { return '' }
        if(seconds <= 10) { return 'a few seconds ago' }
        else if(seconds < 60) { return seconds + ' seconds ago' }
        else if(seconds < 3600) { 
            const unit = Math.trunc(seconds / 60) === 1 ? ' minute ago' : ' minutes ago'
            return Math.trunc(seconds / 60) + unit
        }
        else if(seconds < 86400) { 
            const unit = Math.trunc(seconds / 3600) === 1 ? ' hour ago' : ' hours ago'
            return Math.trunc(seconds / 3600) + unit 
        }
		else if(seconds < 172800) {
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			if(hours === 0) { hours = 12 }
			return "Yesterday at " + parseInt(hours, 10) + ":" + minutes + suffix
		}
        else { 
			let hours, suffix, minutes;
			if(date.getHours() > 12) { hours = date.getHours() - 12; suffix = " PM" }
			else { hours = date.getHours(); suffix = " AM" }
			if(date.getMinutes() < 10) { minutes = "0" + date.getMinutes() }
			else { minutes = date.getMinutes() }
			if(hours === 0) { hours = 12 }
			const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			return months[date.getMonth()] + " " + date.getDate() + " at " + parseInt(hours, 10) + ":" + minutes + suffix;
		}
	}

	fillContent = (baseDir) => { // may work if we want to implement multi video/audio upload
		let content = []
		if(this.state.typePost === 2) {
			[...Array(this.state.fileCount)].forEach((e, i) => {
				content.push(<Image src={baseDir + (i + 1) + ".png"} key={i} style={{ margin: '0 auto' }}/>)
			})
		}
		else if(this.state.typePost === 3) {
			[...Array(this.state.fileCount)].forEach((e, i) => {
				content.push(<ReactPlayer url={baseDir + (i + 1) + ".mkv"} key={i} controls style={{ backgroundColor: 'black' }} />)
			})
		}
		else if(this.state.typePost === 4){
			[...Array(this.state.fileCount)].forEach((e, i) => {
				content.push(<ReactAudioPlayer src={baseDir + (i + 1) + ".flac"} controls key={i}/>)
			})
		}
		return content;
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.state.user.username + '.png'
		const baseDir = 'http://localhost:8080/files?type=post&typePost=' + this.state.typePost + '&id=' + this.state.idPost + "&file="
		const content = this.fillContent(baseDir)
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true,
			arrows: true
		};
		const dark = this.props.darkTheme
	 	const styles = this.getStyles(dark)
		return(
			<Container style={{ width: '100%', height: 'auto', marginBottom: '2.5vh', backgroundColor: dark ? '#1c2938' : 'white', borderColor: dark ? '#1C2938' : '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', breakInside: 'avoid', display: 'inline-block' }}>
				<div style={{ display: 'flex',  marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
					<Image
						src={source}
						style={{ width: 50, height: 50, borderRadius: '100%' }}
					/>
					<div style={{ paddingTop: 5 }}>
						<span style={styles.name}>{this.state.user.name + " " + this.state.user.lastName}</span>
						<span style={styles.username}>{"· @" + this.state.user.username}</span><br/>
						<span style={styles.date}>{this.state.date}</span>
					</div>
				</div>
				<p style={styles.text}>{this.state.postText}</p>
				{this.state.typePost !== 1 && this.state.typePost !== 2 && 
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
					{content[0]}
				</div>}
				{this.state.typePost === 2 &&
				<div style={{ paddingTop: 10, paddingBottom: 40, paddingLeft: 40, paddingRight: 40 }}> 
					<Slider {...settings}>	
						{content.map((file, i) => <div key={i}>{file}</div>)}
					</Slider>
				</div>}
				<div style={{ width: '96%', height: 'auto', display: 'flex', alignItems: 'center', marginLeft: '2%', marginBottom: 10 }}>
					<span style={{ paddingRight: 20 }}><span style={styles.stats}>200</span><span style={styles.statsText}>Likes</span></span>
					<span><span style={styles.stats}>5</span><span style={styles.statsText}>Comments</span></span>
				</div>
				<Divider fitted />
				<div style={{ width: '100%', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button style={styles.reactionsBtns} ref={(ref) => this.btn1 = ref} onMouseOver={() => this.btn1.style.cursor = 'pointer'}>
						<i className="far fa-heart"></i>  Like
					</button>
					<button style={styles.reactionsBtns} ref={(ref) => this.btn2 = ref} onMouseOver={() => this.btn2.style.cursor = 'pointer'}>
						<i className="far fa-comment"></i>  Comment
					</button>
				</div>
			</Container>
			);
	}

	getStyles = (dark) => {
		const styles = {
			name: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 18,
				paddingLeft: 10,
				paddingTop: 5,
				color: dark ? 'white' : 'black'
			},
			username: {
				paddingTop: 5,
				fontFamily: 'Roboto',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				paddingLeft: 5
			},
			date: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				paddingLeft: 10,
				color: dark ? '#8596A3' : 'grey'
			},
			text: {
				wordWrap: 'break-word',
				fontSize: 16,
				fontFamily: 'Heebo',
				fontWeight: 'light',
				paddingLeft: 15,
				paddingRight: 15,
				color: dark ? 'white' : 'black'
			},
			stats: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				color: dark ? 'white' : 'black',
				fontSize: 16,
				paddingRight: 5
			},
			statsText: {
				fontFamily: 'Heebo',
				fontWeight: 'light',
				color: dark ? '#8596A3' : '#606770',
				fontSize: 16,
			},
			reactionsBtns: {
				backgroundColor: 'transparent',
				color: dark ? 'white' : '#606770',
				border: 'none', 
				outline: 0,
				width: '50%',
				height: '100%',
				fontFamily: 'Heebo',
				fontWeight: 'bold',
				fontSize: 18,
				marginBottom: 10,
				transition: '0.4s',
				padding: 0,
				margin: 0,
			}
		}
		return styles
	}
}
/*
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Likes</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Comment</button>
<button style={{ backgroundColor: 'rgb(230, 230, 230)', border: 'none', width: '32.7%', marginLeft: '0.3%', marginRight: '0.3%', borderRadius: '15px' }}>Share</button>
*/