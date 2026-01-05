import pytest

@pytest.fixture(autouse=True)
def patch_mongo(monkeypatch):
    def fake_last_id(db):
        return "00000"
    monkeypatch.setattr('src.utlis.id_generator.IdGenerator._last_id', fake_last_id)

from src.utlis.id_generator import IdGenerator

def test_id_generator_test():
    length = 5
    id_generator_instance = IdGenerator(length)
    assert id_generator_instance.next_id() == "00001"
    assert id_generator_instance.next_id() == "00002"
    assert id_generator_instance.is_valid_id("00002") == True
    assert id_generator_instance.is_valid_id("0002") == False
    assert id_generator_instance.is_valid_id("00003") == True
    