import os
import time
import uuid
import logging
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from backend.routes.domains import domains_bp
from backend.routes.analysis import analysis_bp
from backend.routes.export import export_bp

# Set up logging (P0 Bug B013)
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_app():
    # Setup App
    app = Flask(__name__)
    
    # Configure CORS (P0 Bug B012)
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Register blueprints
    app.register_blueprint(domains_bp, url_prefix='/api')
    app.register_blueprint(analysis_bp, url_prefix='/api')
    app.register_blueprint(export_bp, url_prefix='/api')

    @app.before_request
    def before_request():
        pass

    @app.route('/')
    def index():
        """Serve the frontend dashboard unifying the API and UI at one URL."""
        return send_from_directory(os.path.join(os.path.dirname(__file__), '../templates'), 'dashboard.html')

    @app.route('/api/health', methods=['GET'])
    def health():
        """Health check endpoint (P0 Bug B007)"""
        return jsonify({
            'success': True,
            'data': {'status': 'healthy', 'service': 'cold-xrag-backend', 'timestamp': time.time()},
            'error': None,
            'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'requestId': f"req_{uuid.uuid4().hex[:8]}"
        })

    # Error handling for global failures
    @app.errorhandler(Exception)
    def handle_exception(e):
        logger.error(f"Unhandled Exception: {str(e)}")
        return jsonify({
            'success': False,
            'data': None,
            'error': "Internal Server Error",
            'timestamp': time.strftime('%Y-%m-%dT%H:%M:%SZ'),
            'requestId': f"req_{uuid.uuid4().hex[:8]}"
        }), 500

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5002, debug=True)
