import pytest
from backend.app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_health_endpoint(client):
    rv = client.get('/api/health')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert json_data['success'] is True
    assert json_data['data']['status'] == 'healthy'

def test_domains_endpoint(client):
    rv = client.get('/api/domains')
    assert rv.status_code == 200
    json_data = rv.get_json()
    assert isinstance(json_data, list)
    if len(json_data) > 0:
        assert 'id' in json_data[0]
        assert 'name' in json_data[0]
