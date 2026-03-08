import pytest
import numpy as np
from backend.services.l1 import characterize_signal

def test_l1_stationarity():
    # Generate stationary data (white noise)
    np.random.seed(42)
    data = np.random.normal(0, 1, 100)
    
    result = characterize_signal(data)
    assert result['stationary'] is True
    assert result['snr_db'] < 100  # Should be easily calculated

def test_l1_non_stationarity():
    # Generate non-stationary data (random walk)
    np.random.seed(42)
    data = np.cumsum(np.random.normal(0, 1, 100))
    
    result = characterize_signal(data)
    assert result['stationary'] is False
