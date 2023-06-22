import { newPasswordFromBitwardenItem } from '@/lib/frontend/password.client';
import { BitwardenTypes } from '@/types/validation/bitwarden';

export default function BitwardenImport() {
    return (
        <>
            <label htmlFor="bitwarden-import" className="btn btn-xs hover:bg-info hover:text-black mr-2">
                Bitwarden Import
            </label>
            <input
                id="bitwarden-import"
                className="hidden"
                type="file"
                accept=".json"
                onChange={async (e) => {
                    if (e.target?.files === null || e.target.files?.length === 0) {
                        return;
                    }

                    const promises = [];

                    for (const file of e.target.files) {
                        const text = await file.text();
                        const { data, problems } = BitwardenTypes.BitwardenExport(JSON.parse(text));

                        if (problems) {
                            alert(`Failed to import ${file.name}: ${problems?.summary}`);
                            continue;
                        }

                        for (const item of data.items) {
                            promises.push(newPasswordFromBitwardenItem(item));
                        }
                    }

                    await Promise.all(promises);

                    window.location.reload();
                }}
            />
        </>
    );
}