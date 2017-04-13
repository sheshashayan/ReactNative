/**
 * # SwipeRow.js
 * This class is used to render the list of swipeable rows 
 	 which are passed as parent-children from the frequired container
 * Author: Ravichandran P
 */
import React, {Component, PropTypes,} from 'react';
import {
	Animated,
	PanResponder,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';

const DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD = 2;
const PREVIEW_OPEN_DELAY = 700;
const PREVIEW_CLOSE_DELAY = 300;
const rowDataForPartNumber = null;

/**
 * Row that is generally used in a SwipeListView.
 * If you are rendering a SwipeRow explicitly you must pass the SwipeRow exactly two children.
 * The first will be rendered behind the second.
 */
class SwipeRow extends Component {
	constructor(props) {
		super(props);
		this.horizontalSwipeGestureBegan = false;
		this.swipeInitialX = null;
		this.parentScrollEnabled = true;
		this.ranPreview = false;
		this.state = {
			dimensionsSet: false,
			hiddenHeight: 0,
			hiddenWidth: 0,
			translateX: new Animated.Value(0),
			stopLeftSwipe : this.props.rightOpenValue,
			rowData : this.props.rowData,
		};
		this.rowOnPressdisabled = false;
		this.onceSwiped = false;
		rowDataForPartNumber =this.props.rowData;
		this.rowIdForPartNumber =this.props.rowId;
	}

	componentWillMount() {
		console.log("componentWillMount...");

		this.panResponder = PanResponder.create({
			onMoveShouldSetPanResponder: (e, gs) => this.handleOnMoveShouldSetPanResponder(e, gs,this.props.rowId),
			onPanResponderMove: (e, gs) => this.handlePanResponderMove(e, gs,this.props.rowId,this.props.rowData),
			onPanResponderRelease: (e, gs) => this.handlePanResponderEnd(e, gs),
			onPanResponderTerminate: (e, gs) => this.handlePanResponderEnd(e, gs),
			onShouldBlockNativeResponder: _ => false,
		});
	}

	getPreviewAnimation(toValue, delay) {
		console.log("getPreviewAnimation...")
		return Animated.timing(
			this.state.translateX,
			{ duration: this.props.previewDuration, toValue, delay } );		
	}

	/**
	* # onContentLayout
	* Purpose: This function will be invoked to set the layout for the 
						 content which going to be rendered
	* Author: Ravichandran P
	* Input Param: e, gestureState
	* Output Param: 
	*/
	onContentLayout(e) {
		console.log("onContentLayout dimensionsSet..."+this.state.dimensionsSet);
		console.log("this.props.recalculateHiddenLayout..."+this.props.recalculateHiddenLayout);		
		this.setState({
			dimensionsSet: !this.props.recalculateHiddenLayout,
			hiddenHeight: e.nativeEvent.layout.height,
			hiddenWidth: e.nativeEvent.layout.width,
		});

		if(this.props.preview && !this.ranPreview) {
			this.ranPreview = true;
			let previewOpenValue = this.props.previewOpenValue || this.props.rightOpenValue * 0.5;
			this.getPreviewAnimation(previewOpenValue, PREVIEW_OPEN_DELAY)
			.start( _ => {
				this.getPreviewAnimation(0, PREVIEW_CLOSE_DELAY).start();
			});
		}
	}

	/**
	* # handleOnMoveShouldSetPanResponder
	* Purpose: This function will be invoked each time in the beginning of gesture movement 		    
	* Author: Ravichandran P
	* Input Param: e, gestureState
	* Output Param: 
	*/
	handleOnMoveShouldSetPanResponder(e, gs,rowId) {
		//alert("handleOnMoveShouldSetPanResponder..."+rowId)
		const { dx } = gs;				
		return Math.abs(dx) > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD;
	}

	/**
	* # handlePanResponderMove
	* Purpose: This function will be invoked to track the gesture movement
			   for updating the translateX value 		    
	* Author: Ravichandran P
	* Input Param: e, gestureState
	* Output Param: 
	*/
	handlePanResponderMove(e, gestureState, rowId, rowData) {
		console.log("handlePanResponderMove...")
		const { dx, dy } = gestureState;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);
		var leftStartsFrom = 0;
		
		//passing the swiped row's rowId
		console.log("handlePanResponderMove rowData : "+JSON.stringify(rowData));
		
		this.props.partDataFromRow(rowId, rowData);

		if(absDx > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD || 
				absDy > DIRECTIONAL_DISTANCE_CHANGE_THRESHOLD) {
			if (absDy > absDx && !this.horizontalSwipeGestureBegan) {
				return;
			}
			if(this.swipeInitialX === null) {
					this.swipeInitialX = this.state.translateX._value
				}
			this.horizontalSwipeGestureBegan = true;
			let newDX = this.swipeInitialX + dx;
			if(newDX <= -40){
					newDX = this.state.stopLeftSwipe;
			}
			if(newDX >= this.props.rightOpenValue && newDX <= 0 && this.onceSwiped){
					newDX = 0;		
			}
			if(this.props.disableLeftSwipe  && newDX < 0) { 
					newDX = 0; 
			}			
			if(this.props.disableRightSwipe && newDX > 0) { 
					newDX = 0; 
			}
			if(this.props.stopLeftSwipe && newDX > this.props.stopLeftSwipe){
				 	newDX = this.props.stopLeftSwipe; 
			}
			if(this.props.stopRightSwipe && newDX < this.props.stopRightSwipe){ 
					newDX = this.props.stopRightSwipe; 
			}
			this.setState({
					translateX: new Animated.Value(newDX)
			});
		}
	}

	/**
	* # handlePanResponderEnd
	* Purpose: This function will be invoked to reset the toValue when animation on
			   Swipeable row is finished	
	* Author: Ravichandran P
	* Input Param: e, gestureState
	* Output Param: 
	*/
	handlePanResponderEnd(e, gestureState) {
		console.log("handlePanResponderEnd...");
		if(this.state.translateX._value === this.props.rightOpenValue){
			this.onceSwiped = true;	
		}
		if(this.state.translateX._value === 0){
			this.onceSwiped = false;
		}
		if(!this.parentScrollEnabled) {
			this.parentScrollEnabled = true;
			this.props.setScrollEnabled && this.props.setScrollEnabled(true);
		}
		let toValue = 0;
		if(this.state.translateX._value >= 0) {
			if(this.state.translateX._value > this.props.leftOpenValue / 2) {
				toValue = this.props.leftOpenValue;
			}
		}
		else {
			if(this.state.translateX._value < this.props.rightOpenValue / 2) {
				toValue = this.props.rightOpenValue
			}
		}
		this.manuallySwipeRow(toValue);
	}

	closeRow() {
		console.log("closeRow...")
		this.manuallySwipeRow(0);
	}

 	/**
	* # manuallySwipeRow
	* Purpose: This function is used to invoke the other 
						 onRowDidClose/onRowDidOpen props functions based on the left/right open value
	* Author: Ravichandran P
	* Input Param: toValue
	* Output Param: 
	*/
	manuallySwipeRow(toValue) {				
		console.log("manuallySwipeRow this.props.toValue... "+this.props.toValue);
		console.log("this.props.friction... "+this.props.friction);
		console.log("this.props.tension... "+this.props.tension);		
		Animated.spring(
			this.state.translateX,
			{
				toValue,
			}).start( _ => {		
					if (toValue === 0) {
						this.props.onRowDidClose && this.props.onRowDidClose();
					} else {
						this.props.onRowDidOpen && this.props.onRowDidOpen();
					}});	
		if(toValue === 0) {
			this.props.onRowClose && this.props.onRowClose();
		} 
		else {
			this.props.onRowOpen && this.props.onRowOpen(toValue);
		}
		this.swipeInitialX = null;
		this.horizontalSwipeGestureBegan = false;
	}

	/**
	* # renderVisibleContent
	* Purpose: This function will be invoked to render the visible/parent content
	* Author: Ravichandran P
	* Input Param: 
	* Output Param: 
	*/
	renderVisibleContent() {		
		const onPress = this.props.children[1].props.onPress;
		console.log("renderVisibleContent onPress ..."+onPress);
		if(onPress){
			const newOnPress = _ => {
				onPress();
			}
			return React.cloneElement(
				this.props.children[1],
				{
					...this.props.children[1].props,
				}
			);
		}
		return (
			<View
				activeOpacity={1} >
				{this.props.children[1]}
			</View>
		)
	}

   /**
	* # renderRowContent
	* Purpose: This function will be invoked to set the transform value,
			   panResponderHandlers for rendered visible content in Animated View
	* Author: Ravichandran P
	* Input Param: 
	* Output Param: 
	*/  	
	renderRowContent() {
		console.log('dimensionsSet.. '+this.state.dimensionsSet);
		if (this.state.dimensionsSet) {
			return (
				<Animated.View
					{...this.panResponder.panHandlers}
					style={[{transform: [ {translateX: this.state.translateX}]}]}>
					{this.renderVisibleContent()}
				</Animated.View>
			);
		} 
		else {
			return (
				<Animated.View
					{...this.panResponder.panHandlers}
					onLayout={ (e) => this.onContentLayout(e) }
					style={[ { transform: [{translateX: this.state.translateX}]} ]} >				
					{this.renderVisibleContent()}
				</Animated.View>
			);
		}
	}

	render() {
		console.log("props.children[0] "+this.props.children[0]);
		return (
			<View style={this.props.style ? this.props.style : styles.container}>
				<View style={[styles.hidden,
					{height: this.state.hiddenHeight,width: this.state.hiddenWidth}]}>
					{this.props.children[0]}
				</View>
				{this.renderRowContent()}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	hidden: {
		bottom: 0,
		left: 0,
		overflow: 'hidden',
		position: 'absolute',
		right: 0,
		top: 0,
	},
});

SwipeRow.propTypes = {	
	setScrollEnabled: PropTypes.func,	
	onRowOpen: PropTypes.func,
  	onRowDidOpen: PropTypes.func,	
	leftOpenValue: PropTypes.number,	
	rightOpenValue: PropTypes.number,	
	stopLeftSwipe: PropTypes.number,
	stopRightSwipe: PropTypes.number,
	friction: PropTypes.number,
	tension: PropTypes.number,
	closeOnRowPress: PropTypes.bool,
	disableLeftSwipe: PropTypes.bool,
	disableRightSwipe: PropTypes.bool,
	recalculateHiddenLayout: PropTypes.bool,
	onRowClose: PropTypes.func,  
  	onRowDidClose: PropTypes.func,
	style: View.propTypes.style,
	preview: PropTypes.bool,
	previewDuration: PropTypes.number,
	previewOpenValue: PropTypes.number,
	
	partDataFromRow: PropTypes.func, 
	rowData : PropTypes.object,  
	rowId  : PropTypes.number,
};

SwipeRow.defaultProps = {
	leftOpenValue: 0,
	rightOpenValue: 0,
	closeOnRowPress: false,
	disableLeftSwipe: false,
	disableRightSwipe: false,
	recalculateHiddenLayout: false,
	preview: false,
	previewDuration: 300
};

export default SwipeRow;
