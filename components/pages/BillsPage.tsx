
import React, { useState, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Upload, Paperclip } from 'lucide-react';
import type { Bill } from '../../types';

const BillsPage: React.FC = () => {
    const { bills, addBill, transactions, linkBillToTransaction } = useAppContext();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<string>('');
    const [linkingBill, setLinkingBill] = useState<Bill | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };
    
    const handleUpload = () => {
        if (!selectedFile) return;
        const newBill: Omit<Bill, 'id' | 'uploadDate'> = {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            fileUrl: URL.createObjectURL(selectedFile) 
        };
        addBill(newBill);
        setSelectedFile(null);
    };
    
    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (linkingBill && selectedTransaction) {
            linkBillToTransaction(selectedTransaction, linkingBill.id);
            setLinkingBill(null);
            setSelectedTransaction('');
        }
    };

    const unlinkedTransactions = transactions.filter(t => !t.billId);

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-white">Bills & Receipts</h2>

            <Card title="Upload a Bill">
                 <div className="flex items-center space-x-4">
                    <label className="flex-1 p-4 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:border-primary hover:bg-gray-700/50 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-500 mb-2"/>
                        <span className="text-sm font-medium text-gray-400">
                            {selectedFile ? selectedFile.name : 'Click to select a file (PDF/Image)'}
                        </span>
                        <input type="file" className="hidden" onChange={handleFileChange} accept="image/*,.pdf"/>
                    </label>
                    <Button onClick={handleUpload} disabled={!selectedFile}>
                        Upload Bill
                    </Button>
                </div>
            </Card>

            <Card title="Uploaded Bills">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bills.map(bill => (
                        <div key={bill.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-white truncate">{bill.fileName}</p>
                                <p className="text-xs text-gray-400">{bill.uploadDate}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setLinkingBill(bill); setSelectedTransaction(unlinkedTransactions[0]?.id || '')}}>Link</Button>
                        </div>
                    ))}
                </div>
            </Card>
            
            {linkingBill && (
                <Card title={`Link "${linkingBill.fileName}"`}>
                    <form onSubmit={handleLinkSubmit} className="flex items-end space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Select Transaction</label>
                            <select
                                value={selectedTransaction}
                                onChange={e => setSelectedTransaction(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-primary focus:border-primary"
                            >
                                {unlinkedTransactions.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.date} - {t.description} (${t.amount})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button type="submit">Link to Transaction</Button>
                        <Button variant="ghost" onClick={() => setLinkingBill(null)}>Cancel</Button>
                    </form>
                </Card>
            )}

             <Card title="Linked Bills">
                <ul className="space-y-3">
                    {transactions.filter(t => t.billId).map(t => {
                        const bill = bills.find(b => b.id === t.billId);
                        return (
                             <li key={t.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                                <span>{t.date} - {t.description}</span>
                                {bill && <a href={bill.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-primary hover:underline"><Paperclip size={14} className="mr-1"/> {bill.fileName}</a>}
                            </li>
                        )
                    })}
                </ul>
             </Card>
        </div>
    );
};

export default BillsPage;
