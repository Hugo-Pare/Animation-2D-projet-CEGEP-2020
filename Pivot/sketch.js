function setup() {
  //alias des extensions
Matter.use(MatterAttractors);

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
        Events = Matter.Events,
        Common = Matter.Common,
        Vector = Matter.Vector;

    // création du engine
    var engine = Engine.create(),
    world = engine.world;


    // création du renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 625,
            showVelocity:true
        }
    });

    Render.run(render);

    // création du runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // Dans ce cas, les variables modifiables sont la masse des corps (de 1 à infini), la force sur les corps (de 0 à 1) et
    // le décentrage de la masse droite (pointA de liendroite) (x positif décentre vers la droite et y positif décentre vers le bas)

    // création des corps et des contraintes
    var group = Body.nextGroup(true);

    var center = Bodies.rectangle(550, 300, 300, 50, { collisionFilter: { group: group } });
    var gauche = Bodies.circle(400, 300, 25, {collisionFilter:{group: group}});
    var droite = Bodies.circle(650, 300, 25, {collisionFilter:{group: group}});
    var corde = Bodies.circle(100,100, 25, {collisionFilter:{group:group}});

    var milieu = Constraint.create({
      bodyA: center,
      pointB: {x: 400, y:300},
      pointA: {x:-150, y:0},
      stiffness: 1,
      length:0
    });

    var liengauche = Constraint.create({
      bodyA: center,
      bodyB: gauche,
      pointA: {x:-150, y:0},
      stiffness:1,
      length:0
    });

    var liendroite = Constraint.create({
      render:{
        visible:false
      },
      bodyA: center,
      bodyB: droite,
      pointA: {x: 100, y:0},
      stiffness:1,
      length:0
    });

0


// masse des corps
Body.setMass(gauche, 20);
Body.setMass(droite, 20);
Body.setMass(center, 20);
Body.setMass(corde, 20);

// forces sur les corps
Body.applyForce(droite, {x:500, y:300}, {x:0, y:0});




//ajout des corps et des contraintes dans le world
    World.add(world, [
    center,
    gauche,
    droite,
    milieu,
    liengauche,
    liendroite,
    corde
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

    // centrage de la vue au milieu
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 625 }
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
