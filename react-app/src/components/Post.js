import React from 'react';
import { Container, Image, Divider } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player'
import Slider from "react-slick";

export default class Post extends React.Component {
	constructor(props) {
		super(props);
		this.state = { typeLikeId: -1, likeId: -1, commentsVisible: false, likesVisible: false, liked: false, coefficient: 0, likeList: false };
	}

	componentDidMount = () => {
		this.setState({ date: 'loading...'})
		setInterval(() => this.setState({ date: this.getBeautifiedDate() }), 1000)
		this.checkLike()
	}

	checkLike = () => {
		this.props.post.likes.forEach(like => {
			if (like.userId === this.props.ownUser.id) {
				this.setState({ typeLikeId: like.typeLikeId, likeId: like.likeId, liked: true })
			}
		});
	}

	getBeautifiedDate = () => {
		const seconds = Math.floor((Date.now() - this.props.post.creationTime) / 1000)
		const date = new Date(this.props.post.creationTime)
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
		if(this.props.post.typePost === 2) {
			[...Array(this.props.post.fileCount)].forEach((e, i) => {
				content.push(<Image src={baseDir + (i + 1) + ".png"} key={i} style={{ margin: '0 auto' }}/>)
			})
		}
		else if(this.props.post.typePost === 3) {
			[...Array(this.props.post.fileCount)].forEach((e, i) => {
				content.push(<ReactPlayer url={baseDir + (i + 1) + ".mkv"} key={i} controls style={{ backgroundColor: 'black' }} />)
			})
		}
		else if(this.props.post.typePost === 4){
			[...Array(this.props.post.fileCount)].forEach((e, i) => {
				content.push(<ReactAudioPlayer src={baseDir + (i + 1) + ".flac"} controls key={i}/>)
			})
		}
		return content;
	}

	handleLike = async typeLikeId => { 
		let body = {}
		if(this.state.typeLikeId === -1) {
			body = { typeLikeId: typeLikeId, postId: this.props.post.idPost }
			await fetch('http://localhost:8080/likes', { method: 'POST', body: JSON.stringify(body), credentials: 'include' })
				.then(response => response.json())
				.then(response => {
					if(response.status === 200) {
						this.setState(() => ({ typeLikeId: typeLikeId, likeId: response.data.likeId, likesVisible: false, liked: true, coefficient: this.state.coefficient + 1 }))
					} else {
						console.log(response.message);
						this.setState({ typeLikeId: -1, likeId: -1 })
					}
				});
		} else {
			if (typeLikeId === this.state.typeLikeId) {
				await fetch('http://localhost:8080/likes?likeId=' + this.state.likeId, { method: 'DELETE', credentials: 'include' })
				.then(response => response.json())
				.then(response => {
					if(response.status === 200) {
						this.setState(() => ({ liked: false, coefficient: this.state.coefficient - 1, typeLikeId: -1, likeId: -1, likesVisible: false }))
					} else {
						console.log(response.message)
					}
				})

			} else {
				body = { typeLikeId: typeLikeId, likeId: this.state.likeId }
				await fetch('http://localhost:8080/likes?id=' + this.state.likeId + "&type=" + typeLikeId, {method: 'PUT', body: JSON.stringify(body), credentials: 'include'})
				.then(response => response.json())
				.then(response => {
					if(response.status === 200) {
						this.setState({ typeLikeId: typeLikeId, likesVisible: false })
					} else {
						console.log(response.message)
					}
				})
			}
			
		}
	}

	handleCommentButton = () => {

	}

	getIcon = (likeId, styles) => {
		switch(likeId) {
			case 1: return <i className="fas fa-grin-squint-tears" style={styles.likeIcon}></i>
			case 2: return <i className="fas fa-meh" style={styles.likeIcon}></i>
			case 3: return <i className="fas fa-surprise" style={styles.likeIcon}></i>
			case 4: return <i className="fas fa-sad-cry" style={styles.likeIcon}></i>
			case 5: return <i className="fas fa-grin-hearts" style={styles.likeIcon}></i>
			case 6: return <i className="fas fa-angry" style={styles.likeIcon}></i>
		} 
	}

	render() {
		const source = 'http://localhost:8080/files?type=avatar&file=' + this.props.post.user.username + '.png'
		const baseDir = 'http://localhost:8080/files?type=post&typePost=' + this.props.post.typePost + '&id=' + this.props.post.idPost + "&file="
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
		const liked = this.state.liked
		return(
			<Container style={{ width: '100%', height: 'auto', marginBottom: '2.5vh', backgroundColor: dark ? '#1c2938' : 'white', borderColor: dark ? '#1C2938' : '#DDDFE2', 
			borderRadius: 5, borderWidth: 1.5, borderStyle: 'solid', breakInside: 'avoid', display: 'inline-block', position: 'relative' }}>
				<div style={{ display: 'flex',  marginTop: 10, marginBottom: 10, marginLeft: 10, justifyContent: 'space-between' }}>
					<div style={{ display: 'flex' }}>
						<Image
							src={source}
							style={{ width: 50, height: 50, borderRadius: '100%' }}
						/>
						<div style={{ paddingTop: 5 }}>
							<span style={styles.name}>{this.props.post.user.name + " " + this.props.post.user.lastName}</span>
							<span style={styles.username}>{"· @" + this.props.post.user.username}</span><br/>
							<span style={styles.date}>{this.state.date}</span>
						</div>
					</div>
					{this.props.post.user.id === this.props.ownId && 
					<button style={styles.threeDots}>
						<i className="fas fa-ellipsis-h"></i>
					</button>}
				</div>
				<p style={styles.text}>{this.props.post.postText}</p>
				{this.props.post.typePost !== 1 && this.props.post.typePost !== 2 && 
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
					{content[0]}
				</div>}
				{this.props.post.typePost === 2 &&
				<div style={{ paddingTop: 10, paddingBottom: 40, paddingLeft: 40, paddingRight: 40 }}> 
					<Slider {...settings}>	
						{content.map((file, i) => <div key={i}>{file}</div>)}
					</Slider>
				</div>}
				<div style={{ width: '96%', height: 'auto', display: 'flex', alignItems: 'center', marginLeft: '2%', marginBottom: 10 }}>
					<span style={{ paddingRight: 20, color: dark ? 'white' : 'black' }} ref={(ref) => this.like = ref} onMouseOver={() => { this.like.style.textDecoration = 'underline'; this.like.style.cursor = 'pointer'}}
					onMouseOut={() => this.like.style.textDecoration = 'initial'} onClick={() => this.setState({ likeList: !this.state.likeList, likesVisible: false })}>
						<span style={styles.stats}>{this.props.post.likes.length + this.state.coefficient}</span>
						<span style={styles.statsText}>{this.props.post.likes.length + this.state.coefficient === 1 ? 'Like': 'Likes'}</span>
					</span>
					<span><span style={styles.stats}>{this.props.post.comments.length}</span><span style={styles.statsText}>{this.props.post.comments.length === 1 ? 'Comment': 'Comments'}</span></span>
				</div>
				{this.state.likeList && 
				<div style={{ position: 'absolute', width: 300, height: 'fit-content', backgroundColor: dark ? '#15202B' : '#e0e0e0', borderRadius: 5, zIndex: 1, marginLeft: 5 }}>
					<p style={styles.name}>Likes</p>
					<Divider fitted />
					{this.props.post.likes.map((like, i) => {
						const user = like.user
						return (<div style={{ display: 'flex', padding: 5, paddingLeft: 10 }} key={i}>
							{this.getIcon(like.typeLikeId, styles)}
							<span style={styles.likesName}>{user.name + " " + user.lastName}</span>
							<span style={styles.likesUsername}>{"· @" + user.username}</span>
						</div>)
					})}
				</div>}
				<Divider fitted />
				<div style={{ width: '100%', height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<button style={styles.reactionsBtns} ref={(ref) => this.btn1 = ref} onMouseOver={() => this.btn1.style.cursor = 'pointer'}
					onClick={() => this.setState({ likesVisible: !this.state.likesVisible, likeList: false })}>
						<i className={(liked ? "fas" : "far") + " fa-heart"}></i>  {liked ? 'Liked' : 'Like'}
					</button>
					<button style={styles.reactionsBtns} ref={(ref) => this.btn2 = ref} onMouseOver={() => this.btn2.style.cursor = 'pointer'}
					onClick={() => this.handleCommentButton()}>
						<i className="far fa-comment"></i>  Comment
					</button>
				</div>
				{this.state.likesVisible && 
				<div style={{ position: 'absolute', width: '50%', height: 60, backgroundColor: dark ? '#15202B' : '#e0e0e0', borderRadius: 5, display: 'flex', justifyContent: 'space-between',
				marginTop: -105, zIndex: 1, paddingLeft: 10, paddingRight: 10, marginLeft: 5 }}>
					<button style={this.getStyles(dark, 1).likeBtns} ref={(ref) => this.like1 = ref} onMouseOver={() => this.like1.style.cursor = 'pointer'} onClick={() => this.handleLike(1)}>
						{this.getIcon(1, styles)}<br/>
						Haha
					</button>
					<button style={this.getStyles(dark, 2).likeBtns} ref={(ref) => this.like2 = ref} onMouseOver={() => this.like2.style.cursor = 'pointer'} onClick={() => this.handleLike(2)}>
						{this.getIcon(2, styles)}<br/>
						Meh
					</button>
					<button style={this.getStyles(dark, 3).likeBtns} ref={(ref) => this.like3 = ref} onMouseOver={() => this.like3.style.cursor = 'pointer'} onClick={() => this.handleLike(3)}>
						{this.getIcon(3, styles)}<br/>
						Wow
					</button>
					<button style={this.getStyles(dark, 4).likeBtns} ref={(ref) => this.like4 = ref} onMouseOver={() => this.like4.style.cursor = 'pointer'} onClick={() => this.handleLike(4)}>
						{this.getIcon(4, styles)}<br/>
						Cry
					</button>
					<button style={this.getStyles(dark, 5).likeBtns} ref={(ref) => this.like5 = ref} onMouseOver={() => this.like5.style.cursor = 'pointer'} onClick={() => this.handleLike(5)}>
						{this.getIcon(5, styles)}<br/>
						Love
					</button>
					<button style={this.getStyles(dark, 6).likeBtns} ref={(ref) => this.like6 = ref} onMouseOver={() => this.like6.style.cursor = 'pointer'} onClick={() => this.handleLike(6)}>
						{this.getIcon(6, styles)}<br/>
						Angry
					</button>
				</div>}
			</Container>
			);
	}

	getStyles = (dark, button) => {
		const styles = {
			name: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 18,
				paddingLeft: 10,
				paddingTop: 5,
				color: dark ? 'white' : 'black',
				marginBottom: 0
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
			},
			likeBtns: {
				outline: 0,
				border: 'none',
				backgroundColor: this.state.typeLikeId === button ? (dark ? '#1d2d3c' : '#f1f1f1') : 'transparent',
				fontFamily: 'Roboto',
				color: dark ? 'white' : 'black',
				marginTop: 5,
				marginBottom: 5,
				borderRadius: 5
			},
			threeDots: {
				outline: 0,
				border: 'none',
				backgroundColor: 'transparent',
				color: dark ? 'white' : 'black',
				marginRight: 5,
				textAlign: 'center',
				height: 'fit-content'
			},
			likesName: {
				fontFamily: 'Heebo',
				fontWeight: 'bolder',
				fontSize: 14,
				paddingLeft: 10,
				paddingTop: 5,
				color: dark ? 'white' : 'black',
				marginBottom: 0
			}, 
			likesUsername: {
				paddingTop: 5,
				fontFamily: 'Roboto',
				fontWeight: 'light',
				color: dark ? '#8596A3' : 'grey',
				paddingLeft: 5
			}, 
			likeIcon: { 
				fontSize: 24, 
				color: dark ? 'white' : 'black', 
				marginBottom: 5, 
				marginTop: 5 
			}
		}
		return styles
	}
}
