from flask import jsonify

from src.decorators import singleton
from pymongo import MongoClient

@singleton
class MongoDBService:
    def __init__(self, host=None, port=None) -> None:
        if host is None:
            host = 'localhost'
        if port is None:
            port = 27017
        self.db_client = MongoClient(f"mongodb+srv://kacper2kucharski_db_user:a15gyMHBXV5Y2aGT@cluster0.vxj2xxn.mongodb.net/?appName=Cluster0")

    def get_collection(self, collection_name: str):
        return self.db_client["shortener"][collection_name]
    
    def get_url(self, id: str):
        collection = self.db_client["shortener"]["urls"]
        url_collection = collection.find_one({"id": id})
        if not url_collection:
            return None
        return url_collection

    def get_metrics(self, id: str):
        collection = self.db_client["shortener"]["metrics"]
        metrics_collection = collection.find_one({"id": id})
        return { "id": metrics_collection.get("id"), "visits": metrics_collection.get("visits") }

    def create_metrics(self, id: str):
        collection = self.db_client["shortener"]["metrics"]
        collection.insert_one({"id": id, "visits":0})

    def increment_metrics(self, id: str):
        collection = self.db_client["shortener"]["metrics"]
        collection.update_one({"id": id}, {"$inc": {"visits": 1}})

    def save_url(self, id: str, original_url: str):
        collection = self.db_client["shortener"]["urls"]
        collection.insert_one({"id": id, "original_url": original_url})

    def get_last_id(self):
        collection = self.db_client["shortener"]["urls"]
        last_item = collection.find_one(sort=[("id", -1)])
        if last_item:
            return last_item["id"]
    
    def close_connection(self):
        self.db_client.close()
