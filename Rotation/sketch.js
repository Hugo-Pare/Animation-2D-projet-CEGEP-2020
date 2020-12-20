function setup() {
  //alias des extension
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Composite = Matter.Composite,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Vector = Matter.Vector;

    // création du engine et du world
    var engine = Engine.create(),
        world = engine.world;

    // création du renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showVelocity:true
        }
    });

    Render.run(render);

    // création du runner
    var runner = Runner.create();
    Runner.run(runner, engine);

// Dans ce cas, les variables modifiables sont les masses (de 1 à infini) et les décentrages (pointA des liendroite et liengauche et pointB de milieu)
//(x positif décentre vers la droite et y positif décentre vers le bas)

    // création des corps et des containtes
    var group = Body.nextGroup(true);

   var center= Bodies.rectangle(400, 300, 300, 50, {collisionFilter:{group:group}});
   var gauche = Bodies.circle ( 300, 300, 25, {collisionFilter: {group: group}});
   var droite = Bodies.circle (500, 300, 25, {collisionFilter: {group: group}});

   var milieu = Constraint.create({
     pointA: {x: 400, y:300},
     bodyB: center,
     pointB: {x:50, y:0},
     stiffness :1,
     length: 0
   });

   var liendroite = Constraint.create({
     render:{
       visible: false
     },
     bodyA: center,
     bodyB: droite,
     pointA: {x: 100, y:0},
     stiffness: 1,
     length:0
   });

   var liengauche = Constraint.create({
     render:{
       visible: false
     },
     bodyA: center,
     bodyB: gauche,
     pointA: {x:-100, y:0},
     stifness: 1,
     length:0,
   });

// masse sur les crops
Body.setMass(center, 20);
Body.setMass(gauche, 20);
Body.setMass(droite, 80);


//ajout des corps et contraintes au world
World.add(world, [
  center,
  milieu,
  gauche,
  droite,
  liendroite,
  liengauche

]);


    // controle de la souris
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    render.mouse = mouse;

    // centrage de la vue dans le milieu
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // contexte des extensions
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

if (typeof module !== 'undefined') {
    module.exports = Example[Object.keys(Example)[0]];
}
