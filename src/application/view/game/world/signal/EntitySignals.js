/**
 * Created by chenyonghua on 13-11-25.
 */
var EntitySignals = EntitySignals || {};

//world
EntitySignals.STOP_SCROLL_MAP = new SignalDescriptor("STOP_SCROLL_MAP",[]);
EntitySignals.RESUME_SCROLL_MAP = new SignalDescriptor("RESUME_SCROLL_MAP",[]);
EntitySignals.UPDATE_DISTANCE = new SignalDescriptor("UPDATE_DISTANCE",[]);
EntitySignals.UPDATE_MAP_VELOCITY = new SignalDescriptor("UPDATE_MAP_VELOCITY",[]);


//entity
EntitySignals.DEALING_COLLISION = new SignalDescriptor("DEALING_COLLISION",[]);
EntitySignals.DEALING_FINDING = new SignalDescriptor("DEALING_FINDING",[]);


EntitySignals.ENTER_FRAME = new SignalDescriptor("ENTER_FRAME",[]);
EntitySignals.ANIMATION_COMPLETE = new SignalDescriptor("ANIMATION_COMPLETE",[String]);

EntitySignals.TOUCH_MOVED = new SignalDescriptor("TOUCH_MOVED",[cc.Touch]);

EntitySignals.DESTORY = new SignalDescriptor("DESTORY",[Object]);

EntitySignals.ARRIVE = new SignalDescriptor("ARRIVE",[Object]);

EntitySignals.STARTING_SPAWN = new SignalDescriptor("STARTING_SPAWN",[Object]);
EntitySignals.REPEATING_SPAWN = new SignalDescriptor("REPEATING_SPAWN",[Object]);

EntitySignals.STARTING_SHOOT = new SignalDescriptor("STARTING_SHOOT",[Object]);
EntitySignals.STARTING_COLLIMATE = new SignalDescriptor("STARTING_COLLIMATE",[Object]);
EntitySignals.STARTING_ATTACK = new SignalDescriptor("STARTING_ATTACK",[]);


EntitySignals.SPAWN_RESCUE = new SignalDescriptor("SPAWN_RESCUE",[Object]);
EntitySignals.DEAD = new SignalDescriptor("DEAD",[Object]);
EntitySignals.DEAD_ANIMATION_COMPLETE = new SignalDescriptor("DEAD_ANIMATION_COMPLETE",[Object]);
EntitySignals.HEALTH_CHANGE = new SignalDescriptor("HEALTH_CHANGE",[Object]);

//explosion frame call
EntitySignals.FRAME_CALL = new SignalDescriptor("FRAME_CALL",[Object]);

EntitySignals.GAME_OVER = new SignalDescriptor("GAME_OVER",[Object]);
EntitySignals.UPDATE_STAT = new SignalDescriptor("UPDATE_STAT",[Object]);
EntitySignals.SPAWN_SKILL = new SignalDescriptor("SPAWN_SKILL",[]);

//add
EntitySignals.ADD_FOLLOWER = new SignalDescriptor("ADD_FOLLOWER",[]);
EntitySignals.ADD_COINS = new SignalDescriptor("ADD_COINS",[]);
EntitySignals.ADD_EXP = new SignalDescriptor("ADD_EXP",[]);
EntitySignals.ADD_HP = new SignalDescriptor("ADD_HP",[]);

//gameOver
EntitySignals.COLLECT_RESCUE = new SignalDescriptor("COLLECT_RESCUE",[Object]);


