import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, X } from 'lucide-react';
import type { DeviceInfo } from '@/lib/api/types';

interface SearchFilterWidgetProps {
  devices: DeviceInfo[];
  onFilterChange: (filteredDevices: DeviceInfo[]) => void;
}

const SearchFilterWidget: React.FC<SearchFilterWidgetProps> = ({ devices, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    applyFilters(value, statusFilter);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value);
    applyFilters(searchTerm, value);
  };

  const applyFilters = (search: string, status: string) => {
    let filtered = devices;

    // Поиск по названию
    if (search.trim()) {
      filtered = filtered.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Фильтр по статусу
    if (status !== 'all') {
      filtered = filtered.filter(device => device.status === status);
    }

    onFilterChange(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    onFilterChange(devices);
  };

  const hasActiveFilters = searchTerm.trim() || statusFilter !== 'all';

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию устройства..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 h-11"
        />
      </div>
      
      <Select value={statusFilter} onValueChange={handleStatusFilter}>
        <SelectTrigger className="w-full sm:w-48 h-11">
          <SelectValue placeholder="Фильтр по статусу" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все статусы</SelectItem>
          <SelectItem value="active">Активные</SelectItem>
          <SelectItem value="deactivated">Отключенные</SelectItem>
          <SelectItem value="pending_delete">Ожидают удаления</SelectItem>
          <SelectItem value="deleted">Удаленные</SelectItem>
        </SelectContent>
      </Select>
      
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearFilters}
          className="h-11 px-4 hover:bg-secondary/50 transition-colors duration-200"
        >
          <X className="w-4 h-4 mr-2" />
          Очистить
        </Button>
      )}
    </div>
  );
};

export default SearchFilterWidget;
