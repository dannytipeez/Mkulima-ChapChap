# myapp/management/commands/update_tool_conditions.py
from django.core.management.base import BaseCommand
from farm.models import Tool
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Update tool conditions'
    """ for updating tool conditions (Good, Needs Maintenance and Under Maintenance) """

    def handle(self, *args, **options):
        # Get all tools
        tools = Tool.objects.all()

        for tool in tools:
            if tool.last_maintenance_date:
                # Calculate the number of days since the last maintenance
                days_since_maintenance = (datetime.now().date() - tool.last_maintenance_date).days
                if days_since_maintenance <= 14:
                    tool.condition = "Good"
                else:
                    tool.condition = "Needs Maintenance"
                tool.save()

        self.stdout.write(self.style.SUCCESS('Tool conditions updated successfully'))
