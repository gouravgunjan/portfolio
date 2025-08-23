import React, { useRef, useEffect } from 'react';

/**
 * Represents a single node in the neural network.
 */
class Node {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  fadeSpeed: number;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = Math.random();
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
  }

  /**
   * Draws the node on the canvas.
   * @param ctx The canvas rendering context.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }

  /**
   * Updates the node's opacity.
   */
  update() {
    this.opacity += this.fadeSpeed;
    if (this.opacity > 1 || this.opacity < 0) {
      this.fadeSpeed *= -1;
    }
  }
}

/**
 * Represents a single particle (dot) that travels between nodes.
 */
class Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speed: number;
  targetNode: Node;
  sourceNode: Node;
  progress: number;

  constructor(sourceNode: Node, targetNode: Node, radius: number, color: string, speed: number) {
    this.sourceNode = sourceNode;
    this.targetNode = targetNode;
    this.x = sourceNode.x;
    this.y = sourceNode.y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.progress = 0;
  }

  /**
   * Draws the particle on the canvas.
   * @param ctx The canvas rendering context.
   */
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  /**
   * Updates the particle's position.
   * @returns True if the particle has reached its target, false otherwise.
   */
  update() {
    this.progress += this.speed;
    this.x = this.sourceNode.x + (this.targetNode.x - this.sourceNode.x) * this.progress;
    this.y = this.sourceNode.y + (this.targetNode.y - this.sourceNode.y) * this.progress;

    if (this.progress >= 1) {
      return true; // Particle has reached its target
    }
    return false;
  }
}

/**
 * Manages the neural network animation.
 */
class NeuralNetworkAnimation {
  nodes: Node[];
  particles: Particle[];
  connections: { source: Node, target: Node }[];
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.nodes = [];
    this.particles = [];
    this.connections = [];
    this.createNodes();
    this.createConnections();
    this.createParticles();
  }

  /**
   * Creates the nodes of the neural network.
   */
  createNodes() {
    const nodeCount = 50; // Reduced node count
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const radius = Math.random() * 1 + 0.5; // Smaller nodes
      const color = 'rgba(255, 255, 255, 0.3)';
      this.nodes.push(new Node(x, y, radius, color));
    }
  }

  /**
   * Establishes connections between nodes that are close to each other.
   */
  createConnections() {
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dist = Math.hypot(this.nodes[i].x - this.nodes[j].x, this.nodes[i].y - this.nodes[j].y);
        if (dist < 200) {
          this.connections.push({ source: this.nodes[i], target: this.nodes[j] });
        }
      }
    }

    // Connect all clusters
    const visited = new Set<Node>();
    const queue: Node[] = [this.nodes[0]];
    visited.add(this.nodes[0]);

    while (queue.length > 0) {
      const currentNode = queue.shift()!;
      this.connections.forEach(connection => {
        if (connection.source === currentNode && !visited.has(connection.target)) {
          visited.add(connection.target);
          queue.push(connection.target);
        }
        if (connection.target === currentNode && !visited.has(connection.source)) {
          visited.add(connection.source);
          queue.push(connection.source);
        }
      });
    }

    if (visited.size < this.nodes.length) {
      const unvisited = this.nodes.filter(node => !visited.has(node));
      unvisited.forEach(node => {
        let closestNode: Node | null = null;
        let minDistance = Infinity;
        visited.forEach(visitedNode => {
          const dist = Math.hypot(node.x - visitedNode.x, node.y - visitedNode.y);
          if (dist < minDistance) {
            minDistance = dist;
            closestNode = visitedNode;
          }
        });
        if (closestNode) {
          this.connections.push({ source: node, target: closestNode });
        }
      });
    }
  }

  /**
   * Creates the particles that travel between nodes.
   */
  createParticles() {
    const particleCount = 50; // Drastically reduced particle count
    for (let i = 0; i < particleCount; i++) {
      this.spawnParticle();
    }
  }

  /**
   * Spawns a new particle on a valid connection.
   */
  spawnParticle() {
    if (this.connections.length === 0) return;
    
    const connection = this.connections[Math.floor(Math.random() * this.connections.length)];
    const { source, target } = Math.random() > 0.5 
      ? { source: connection.source, target: connection.target } 
      : { source: connection.target, target: connection.source };

    const radius = Math.random() * 1 + 0.5;
    const color = 'rgba(255, 255, 255, 0.5)';
    const speed = Math.random() * 0.005 + 0.002;
    this.particles.push(new Particle(source, target, radius, color, speed));
  }

  /**
   * Draws the neural network on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw lines along established connections
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 0.5; // Increased line width
    this.connections.forEach(connection => {
      this.ctx.beginPath();
      this.ctx.moveTo(connection.source.x, connection.source.y);
      this.ctx.lineTo(connection.target.x, connection.target.y);
      this.ctx.stroke();
    });

    // Draw nodes
    this.nodes.forEach(node => node.draw(this.ctx));

    // Draw particles
    this.particles.forEach(particle => particle.draw(this.ctx));
  }

  /**
   * Updates the state of the animation.
   */
  update() {
    this.nodes.forEach(node => node.update());
    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].update()) {
        this.particles.splice(i, 1);
        this.spawnParticle();
      }
    }
  }

  /**
   * The main animation loop.
   */
  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

/**
 * The React component that renders the neural network animation.
 */
const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animation = new NeuralNetworkAnimation(ctx, canvas.width, canvas.height);
    animation.animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      animation.width = canvas.width;
      animation.height = canvas.height;
      animation.nodes = [];
      animation.particles = [];
      animation.createNodes();
      animation.createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />;
};

export default NeuralNetwork;
