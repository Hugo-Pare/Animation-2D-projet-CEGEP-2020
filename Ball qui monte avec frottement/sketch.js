
function setup() {
  // alias des extensions
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // création du engine et du world
    var engine = Engine.create(),
        world = engine.world;

    // création du renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options:{
          width:800,
          height: 600,
          showVelocity:true,
          showAngleIndicator: true
        }

    });

    Render.run(render);

    // création du runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // Dans ce cas, les variables qui sont modifiables sont la masse des corps (de 1 à infini),la force sur les corps (de 0 à infini),
    //la friction des cercles (de 0 à 1) (pas des pentes) et l'angle des pentes (de 0 à 0.5)

  // liste de corps
var toit = Bodies.rectangle(400, 0, 800, 10, { isStatic: true }),
    sol = Bodies.rectangle(400, 600, 800, 10, { isStatic: true }),
    murgauche =   Bodies.rectangle(800, 300, 10, 600, { isStatic: true }),
    murdroit=Bodies.rectangle(0, 300, 10, 600, { isStatic: true }),
    pentehaut=  Bodies.rectangle(300, 130, 1100, 10, {friction:1 , slop:0, restitution:0, angle: Math.PI * 0.06 ,  isStatic: true}),
    cercleA=Bodies.circle(600, 140, 40, {slop:0, restitution:0,friction: 0.005, airfriction:0.001, staticFriction: 100 }),
    pentecentre= Bodies.rectangle(300, 300, 1100, 10, {friction:1, slop:0, restitution:0, angle: Math.PI * 0.06 ,  isStatic: true }),
    cercleB= Bodies.circle(600, 310, 40, {slop:0, restitution:0, friction: 0.005, airfriction:0.001, staticFriction: 100}),
    pentebas=Bodies.rectangle(300,475, 1100, 10, {friction:1, slop:0, restitution:0,  angle: Math.PI * 0.06 ,  isStatic: true }),
    cercleC= Bodies.circle(600, 480, 40, {slop:0, restitution:0, friction: 0.005, airfriction:0.001, staticFriction: 100});

// force sur les corps
Matter.Body.applyForce(cercleA, {x:600, y:190}, {x:-0.25 ,y:0} ),
Matter.Body.applyForce(cercleB, {x:600, y:360}, {x:-0.25 ,y:0} ),
Matter.Body.applyForce(cercleC, {x:600, y:530}, {x:-0.25 ,y:0} );

// masse des corps
Matter.Body.setMass(cercleA, 20);
Matter.Body.setMass(cercleB, 20);
Matter.Body.setMass(cercleC, 20);

// ajout des corps au world
    World.add(world, [toit, sol, murgauche, murdroit, pentehaut, cercleA, pentecentre, cercleB, pentebas, cercleC]);

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

    // centrage du la vue au milieu du monde
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // contexte pour les extensions
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
