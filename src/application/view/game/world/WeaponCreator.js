/**
 * Created by chenyonghua on 14-3-21.
 */
var WeaponCreator = {};

WeaponCreator.BaseBullet = function()
{
    var entity = EntityCreator.createEntity( GameConst.BULLET + EntityCreator.getNewID() );

    var animation = new AnimationRenderer();
    animation.setScale(1.5);
    entity.addComponent( animation, "render" );

    var boundCheck = new RowBoundDestoryComponent();
    var timeGenerator = new SingleNumberGenerator();
    timeGenerator.setValue(0.5);
    boundCheck.setCooldownTime( timeGenerator );
    entity.addComponent( boundCheck, "boundCheck" );

    //add DestoryComponent to kill self
    var destory = new DestoryingComponent();
    destory.setSignalDescriptor( EntitySignals.DEALING_COLLISION );
    entity.addComponent( destory, "destory" );

//    var collisionResponse = new sf.CollisionResponseComponent();
//    collisionResponse.setObjectMask( sf.ObjectType.create(GameConst.BATTLE_ITEM) );
//    var damageCollisionResponseStrategy = new DamageCollisionResponseStrategy();
//    var damageControl = new EntityCountingControlStrategy();
//    damageControl.setMaxHit( 1 );
//    damageCollisionResponseStrategy.setControlStrategy( damageControl );
//    damageCollisionResponseStrategy.damageAmount = 100;
//    damageCollisionResponseStrategy.damageType = null;
//    collisionResponse.add( damageCollisionResponseStrategy, "damageCollisionResponseStrategy" );
//    entity.addComponent( collisionResponse, "collisionResponse" );
    return entity;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// 子弹 ////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
WeaponCreator.createLance = function( )
{
    var entity = WeaponCreator.BaseBullet( );

    var animation = entity.lookupComponent(GameConst.render);
    animation.setScale(0.9);
    animation.queue( GameConst.ANI_LANCE, false );

    var spatial = entity.lookupComponent( GameConst.spatial );
    spatial.setObjectType( sf.ObjectType.create( GameConst.LANCE ) );
    spatial.setWidth( 1 );
    spatial.setHeight( 0.2 );
    spatial.setVelX( 0.5 );

    var throwing = new ThrowingComponent();
    entity.addComponent(throwing,GameConst.throwing);

    return entity;
}
WeaponCreator.createArrow = function( )
{
    var entity = WeaponCreator.BaseBullet( );

    var animation = entity.lookupComponent(GameConst.render);
    animation.setScale(0.9);
    animation.queue( GameConst.ANI_ARROW, false );

    var spatial = entity.lookupComponent( GameConst.spatial );
    spatial.setObjectType( sf.ObjectType.create( GameConst.ARROW ) );
    spatial.setWidth( 1 );
    spatial.setHeight( 0.2 );
    spatial.setVelX( 0.5 );

    var throwing = new ThrowingComponent();
    entity.addComponent(throwing,GameConst.throwing);

    return entity;
}