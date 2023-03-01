// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    msg: string
}

export default function checkoutSession(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const totalItems = req.body.items.length

    res.status(200).json({ msg: `checkout session called with ${totalItems}` })
}
