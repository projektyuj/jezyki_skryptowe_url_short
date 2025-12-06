from database.db_service import MongoDBService


def get_metrics(id: str):
    MongoDBService_instance = MongoDBService.get_instance()
    metrics = MongoDBService_instance.get_metrics(id)
    return metrics

def increment_metrics(id: str):
    MongoDBService_instance = MongoDBService.get_instance()
    MongoDBService_instance.increment_metrics(id)

def create_metrics(id: str):
    MongoDBService_instance = MongoDBService.get_instance()
    MongoDBService_instance.create_metrics(id)