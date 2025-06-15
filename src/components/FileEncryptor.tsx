
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, KeyRound, ShieldCheck, ShieldOff } from "lucide-react";
import CryptoJS from "crypto-js";
import { toast } from "@/components/ui/sonner";

export default function FileEncryptor() {
  // Encryption states
  const [fileToEncrypt, setFileToEncrypt] = useState<File | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string>("");
  const [encryptedFileUrl, setEncryptedFileUrl] = useState<string>("");
  const [encryptedFileName, setEncryptedFileName] = useState<string>("");

  // Decryption states
  const [fileToDecrypt, setFileToDecrypt] = useState<File | null>(null);
  const [decryptionKey, setDecryptionKey] = useState<string>("");
  const [decryptedFileUrl, setDecryptedFileUrl] = useState<string>("");
  const [decryptedFileName, setDecryptedFileName] = useState<string>("");

  const handleFileToEncryptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileToEncrypt(e.target.files[0]);
    }
  };

  const handleEncrypt = () => {
    if (!fileToEncrypt || !encryptionKey) {
      toast.error("Please select a file and enter an encryption key.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result as string;
      const encrypted = CryptoJS.AES.encrypt(fileData, encryptionKey).toString();

      const blob = new Blob([encrypted], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      setEncryptedFileUrl(url);
      setEncryptedFileName(`encrypted-${fileToEncrypt.name}.txt`);
      toast.success("File encrypted successfully!");
    };
    reader.onerror = () => {
      toast.error("Failed to read the file.");
    }
    reader.readAsDataURL(fileToEncrypt);
  };

  const handleFileToDecryptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileToDecrypt(e.target.files[0]);
    }
  };

  const handleDecrypt = () => {
    if (!fileToDecrypt || !decryptionKey) {
      toast.error("Please select a file and provide the decryption key.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const encryptedData = reader.result as string;
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, decryptionKey);
        const decryptedDataUrl = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedDataUrl) {
            throw new Error("Decryption failed. Check the key or file.");
        }

        fetch(decryptedDataUrl)
          .then(res => res.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const originalName = fileToDecrypt.name.startsWith("encrypted-")
              ? fileToDecrypt.name.replace("encrypted-", "").replace(".txt", "")
              : `decrypted-file`;
              
            setDecryptedFileUrl(url);
            setDecryptedFileName(originalName);
            toast.success("File decrypted successfully!");
          });

      } catch (error) {
        toast.error("Decryption failed. Please check your key or the encrypted file.");
        console.error("Decryption error:", error);
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read the encrypted file.");
    }
    reader.readAsText(fileToDecrypt);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldCheck /> Encrypt a File</CardTitle>
          <CardDescription>Upload a file and provide a password to encrypt it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="encrypt-file">Select file</Label>
            <Input id="encrypt-file" type="file" onChange={handleFileToEncryptChange} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="encryption-key">Encryption Key / Password</Label>
            <Input id="encryption-key" type="password" placeholder="Enter a strong key" value={encryptionKey} onChange={(e) => setEncryptionKey(e.target.value)} />
          </div>
          <Button onClick={handleEncrypt} disabled={!fileToEncrypt || !encryptionKey}>
            <Upload className="mr-2" /> Encrypt File
          </Button>
          {encryptedFileUrl && (
            <div className="space-y-4 rounded-md border p-4 animate-fade-in">
              <h3 className="font-semibold">Encryption Successful!</h3>
              <p className="text-sm text-muted-foreground">Your file is encrypted. Download the encrypted file. <strong>Remember the key/password you used! You cannot decrypt your file without it.</strong></p>
              <div className="flex flex-wrap gap-4">
                <a href={encryptedFileUrl} download={encryptedFileName}>
                  <Button variant="secondary">
                    <Download className="mr-2" /> Download Encrypted File
                  </Button>
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ShieldOff /> Decrypt a File</CardTitle>
          <CardDescription>Upload an encrypted file and provide the key to decrypt it.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="decrypt-file">Select encrypted file (.txt)</Label>
            <Input id="decrypt-file" type="file" accept=".txt" onChange={handleFileToDecryptChange} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="decryption-key">Decryption Key / Password</Label>
            <Input id="decryption-key" type="password" placeholder="Enter your key" value={decryptionKey} onChange={(e) => setDecryptionKey(e.target.value)} />
          </div>
          <Button onClick={handleDecrypt} disabled={!fileToDecrypt || !decryptionKey}>
            <Download className="mr-2" /> Decrypt File
          </Button>
          {decryptedFileUrl && (
             <div className="space-y-4 rounded-md border p-4 animate-fade-in">
              <h3 className="font-semibold">Decryption Successful!</h3>
              <p className="text-sm text-muted-foreground">Your file has been decrypted. You can now download it.</p>
              <a href={decryptedFileUrl} download={decryptedFileName}>
                <Button>
                  <Download className="mr-2" /> Download Decrypted File
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
